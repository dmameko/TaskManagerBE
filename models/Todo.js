const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  readonly: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Todo', todoSchema);
