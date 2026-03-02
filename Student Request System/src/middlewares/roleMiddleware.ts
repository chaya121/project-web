import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowed: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });
    if (!allowed.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};