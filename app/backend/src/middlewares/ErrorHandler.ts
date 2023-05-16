import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

interface ExtendedError extends Error {
  status?: number;
  message: string;
}

const errorHandler: ErrorRequestHandler = (
  error: ExtendedError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({ message });
};

export default errorHandler;
