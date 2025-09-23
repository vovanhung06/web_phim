import express from 'express';
import { register, login, getUsers, getProfile, updateUser ,changePassword  } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/me', verifyToken, getProfile); // <-- route mới
router.put('/update', verifyToken, updateUser); 
router.post('/change-password', verifyToken, changePassword);

export default router;
