import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

require('dotenv').config();

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';


const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // if used during testing
  'https://task-manager-authentication.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
