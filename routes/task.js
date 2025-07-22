const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

router.post('/', auth, async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Task({
    userId: req.user.id,
    title,
    description,
    status
  });
  await newTask.save();
  res.json(newTask);
});

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Task deleted' });
});

export default router;

