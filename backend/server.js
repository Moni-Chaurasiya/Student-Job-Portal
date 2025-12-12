import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Assessment Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      applications: '/api/applications',
      tasks: '/api/tasks',
      users: '/api/users'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});

export default app;