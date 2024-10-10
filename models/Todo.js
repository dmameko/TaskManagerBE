const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Todo', todoSchema);
