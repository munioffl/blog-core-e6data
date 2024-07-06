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
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token has expired. Please log in again.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token. Please log in again.' });
    } else {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while processing the token.' });
    }
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