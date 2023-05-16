import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export default function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const decoded = verifyToken(authorization);
      res.locals.user = decoded;
      next();
      return;
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
      return;
    }
  }

  res.status(401).json({ message: 'Token not found' });
}
