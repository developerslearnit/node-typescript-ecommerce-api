import express from 'express';
import { ApiConstants } from '../utils';

export const handleApiAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const apiKey = req.headers['x-simplexit-api-key'];
  if (!apiKey) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  if (apiKey !== ApiConstants.ApiKey) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  next();
};
