import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const JWT_SECRET: string = process.env.JWT_SECRET ?? 'supersecret';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing token' });
    }
    const token = h.split(' ')[1];

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    const user = await UserModel.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};