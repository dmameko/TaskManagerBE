const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:9000/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
