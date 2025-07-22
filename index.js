const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // if used during testing
  'https://task-manager-authentication.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.options('*', cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => res.send('Task Manager API is live '));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
