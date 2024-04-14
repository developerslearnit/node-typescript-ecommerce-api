import express from 'express';
import { db } from '../lib/db';
import { errorHandler } from '../exceptions/error-handler';
import { HttpCode, HttpError } from '../exceptions/http-error';

export const handleApiAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const apiKey = req.headers['x-simplexit-api-key'];

  if (!apiKey) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ description: 'UnAuthorized' });
  }

  const keyFromHeader = apiKey.toString();

  const apiUserKey = await db.apiClient.findFirst({
    where: {
      api_key: keyFromHeader,
    },
    select: {
      api_key: true,
      id: true,
      email: true,
    },
  });

  if (!apiUserKey) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ description: 'UnAuthorized' });
  }

  console.log(JSON.stringify(apiUserKey));

  const API_KEY = apiUserKey.api_key;

  if (apiKey !== API_KEY) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ description: 'UnAuthorized' });
  }
  return next();
};

export const handleErrors = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  errorHandler.handleError(err, res);
};
