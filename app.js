const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Task = mongoose.model('Task', {
  title: String,
  description: String,
  completed: Boolean
});

app.use(bodyParser.json());


app.post('/api/tasks', async (req, res) => {
  const { title, description, completed } = req.body;
  const task = new Task({ title, description, completed });
  await task.save();
  res.json(task);
});


app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});


app.get('/api/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});


app.put('/api/tasks/:id', async (req, res) => {
  const { title, description, completed } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true });
  res.json(task);
});


app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
