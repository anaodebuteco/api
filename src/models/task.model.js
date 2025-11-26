const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 500 },
    status: { type: String, enum: ['pending', 'in_progress', 'done'], default: 'pending' },
    dueDate: { type: Date },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Regra de negócio: dueDate não pode ser passado
taskSchema.pre('validate', function (next) {
  if (this.dueDate && this.dueDate < new Date(new Date().setHours(0,0,0,0))) {
    return next(new Error('A data de vencimento não pode estar no passado'));
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
