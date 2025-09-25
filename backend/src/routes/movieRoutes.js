import { Router } from 'express';
import * as ctrl from '../controllers/movieController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

const requireAdmin = (req, res, next) => {
  req.user?.role === 'admin'
    ? next()
    : res.status(403).json({ message: 'Forbidden' });
};

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

router.post('/', verifyToken, requireAdmin, ctrl.create);
router.put('/:id', verifyToken, requireAdmin, ctrl.update);
router.delete('/:id', verifyToken, requireAdmin, ctrl.remove);
router.post('/import/tmdb', verifyToken, requireAdmin, ctrl.importFromTmdb);

export default router;   // <-- đã có export default
