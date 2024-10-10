const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
require('dotenv').config();

const router = express.Router();

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

router.post('/', verifyToken, async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({
    title,
    userId: req.user.userId
  });

  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
});

router.get('/', verifyToken, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});

router.put('/:id/active', verifyToken, async (req, res) => {
  const { active } = req.body;

  if (active === undefined) {
    return res.status(400).json({ message: 'Active status is required.' });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { active },
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or you do not have permission to update.' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo.', error });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

  if (!todo) return res.status(404).json({ message: 'Todo not found or you do not have permission.' });

  res.json({ message: 'Todo deleted successfully.' });
});

module.exports = router;
