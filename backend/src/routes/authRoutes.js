import express from 'express';
import { register, login, getUsers, getProfile, updateUser ,changePassword, updateUserByAdmin,deleteUser  } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.delete('/users/:id', verifyToken, deleteUser);
router.put('/users/:id', verifyToken, updateUserByAdmin);
router.get('/me', verifyToken, getProfile);
router.put('/update', verifyToken, updateUser); 
router.post('/change-password', verifyToken, changePassword);

export default router;
