const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('Registration request received:', req.body);
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ msg: 'User not found!' });
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({ msg: 'Username or password is incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
      
    res.status(200).json({ token, msg: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
