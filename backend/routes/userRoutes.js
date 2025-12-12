import express from 'express';
import {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

/***** User Routes (Both Student & Admin) *****/
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

/***** Admin Routes *****/ 
router.get('/all', auth, adminAuth, getAllUsers);
router.delete('/:id', auth, adminAuth, deleteUser);

export default router;