import express from 'express';
import {
  submitApplication,
  getMyApplications,
  getAllApplications,
  getApplicationStats,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
} from '../controllers/applicationController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

/***** Student Routes *****/ 
router.post('/submit', auth, submitApplication);
router.get('/my-applications', auth, getMyApplications);


/***** Admin Routes *****/ 
router.get('/all', auth, adminAuth, getAllApplications);
router.get('/stats', auth, adminAuth, getApplicationStats);
router.get('/:id', auth, getApplicationById);
router.put('/:id/status', auth, adminAuth, updateApplicationStatus);
router.delete('/:id', auth, adminAuth, deleteApplication);

export default router;