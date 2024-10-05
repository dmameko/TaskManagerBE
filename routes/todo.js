const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
require('dotenv').config();

const router = express.Router();

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
}

// Create a new todo
router.post('/', verifyToken, async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({
    text,
    userId: req.user.userId // Associate todo with the logged-in user
  });

  await todo.save();
  res.status(201).json(todo);
});

// Get all todos for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});

// Update a todo item
router.put('/:id', verifyToken, async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { text, completed },
    { new: true }
  );

  if (!todo) return res.status(404).json({ message: 'Todo not found or you do not have permission.' });

  res.json(todo);
});

// Delete a todo item
router.delete('/:id', verifyToken, async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

  if (!todo) return res.status(404).json({ message: 'Todo not found or you do not have permission.' });

  res.json({ message: 'Todo deleted successfully.' });
});

module.exports = router;
