import express from 'express';
import {
  createTask,
  getMyTasks,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getTasksByApplication
} from '../controllers/taskController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();


/***** Student Routes *****/ 
router.get('/my-tasks', auth, getMyTasks);
router.get('/:id', auth, getTaskById);
router.put('/:id/status', auth, updateTaskStatus);

/***** Admin Routes *****/ 
router.post('/create', auth, adminAuth, createTask);
router.get('/all', auth, adminAuth, getAllTasks);
router.put('/:id', auth, adminAuth, updateTask);
router.delete('/:id', auth, adminAuth, deleteTask);
router.get('/application/:applicationId', auth, adminAuth, getTasksByApplication);

export default router;