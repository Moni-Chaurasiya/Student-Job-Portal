import express from 'express';
import {
  studentSignup,
  studentLogin,
  adminSignup,
  adminLogin
} from '../controllers/authController.js';

const router = express.Router();


/***** Student Routes *****/ 
router.post('/student/signup', studentSignup);
router.post('/student/login', studentLogin);

/***** Admin Routes *****/ 
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

export default router;