import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import UserModel from '../models/User.js';

/* =========================
   ENV CONFIG
========================= */

// บังคับให้เป็น string ชัดเจน
const JWT_SECRET: string = process.env.JWT_SECRET ?? 'supersecret';

// jsonwebtoken ต้องการ string | number
const JWT_EXPIRES: SignOptions['expiresIn'] = (
  process.env.JWT_EXPIRES ?? '1d'
) as SignOptions['expiresIn'];

/* =========================
   GENERATE TOKEN FUNCTION
========================= */

const generateToken = (id: string, role: string): string => {
  const payload = { id, role };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
};

/* =========================
   REGISTER
========================= */

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(user._id.toString(), user.role);

    return res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   LOGIN
========================= */

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString(), user.role);

    return res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   GET CURRENT USER
========================= */

export const getMe = async (
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await UserModel.findById(req.user.id).select('-password');

    return res.json(user);
  } catch (err) {
    next(err);
  }
};