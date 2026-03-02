import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

export default router;