const express = require('express');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validations/task.validation');
const {
  createTask, getTasks, getTaskById, updateTask, deleteTask
} = require('../controllers/task.controller');

const router = express.Router();

// Leitura pública (opcional). Se quiser, adicione auth também.
router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);

// Escrita protegida
router.post('/', auth, validate(createTaskSchema), createTask);
router.put('/:id', auth, validate(updateTaskSchema), updateTask);
router.patch('/:id', auth, validate(updateTaskSchema), updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
