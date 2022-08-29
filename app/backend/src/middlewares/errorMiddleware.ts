import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  return next(err);
};

export default errorMiddleware;
