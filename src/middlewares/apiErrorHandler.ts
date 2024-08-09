import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  status?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'An internal server error occurred';

  res.status(status).json({ error: message });
};