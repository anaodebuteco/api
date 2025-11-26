const Task = require('../models/task.model');

const createTask = async (req, res) => {
  const owner = req.user.id;
  const data = { ...req.body, owner };
  try {
    const task = await Task.create(data);
    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao criar tarefa', details: err.message });
  }
};

const getTasks = async (req, res) => {
  const { status, q } = req.query;
  const filter = { owner: req.user?.id }; // leitura pode ser pública; ajuste se desejar
  if (status) filter.status = status;
  if (q) filter.title = { $regex: q, $options: 'i' };

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  if (req.user && task.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Sem permissão para acessar esta tarefa' });
  }
  return res.status(200).json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  if (task.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Sem permissão para atualizar esta tarefa' });
  }

  Object.assign(task, req.body);
  try {
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao atualizar tarefa', details: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  if (task.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Sem permissão para deletar esta tarefa' });
  }
  await task.deleteOne();
  return res.status(204).send();
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
