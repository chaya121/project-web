import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import UserModel from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;
    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already used' });

    const user = await UserModel.create({ name, email, password, role });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await (user as any).comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authMiddleware attaches req.user
    const user = (req as any).user;
    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};