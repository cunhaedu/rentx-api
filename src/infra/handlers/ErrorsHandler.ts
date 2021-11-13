import { Response, Request, NextFunction } from 'express';

import AppError from '@infra/errors/AppError';

const errorsHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default errorsHandler;
