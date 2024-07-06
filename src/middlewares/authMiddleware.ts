// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { statusCodes } from '../utils/statusCodes';


interface CustomRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(statusCodes.FORBIDDEN).json({ message: 'Invalid token' });
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(statusCodes.FORBIDDEN).json({ message: 'Access denied.' });
    }
    next();
  };
}