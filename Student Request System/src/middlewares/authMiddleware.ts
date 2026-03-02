import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ message: 'Missing token' });
    const token = h.split(' ')[1];
    const payload: any = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};