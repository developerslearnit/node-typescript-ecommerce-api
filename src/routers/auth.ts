import { Router } from 'express';
import { createApiUser } from '../controllers/auth';
import { ApiConstants } from '../utils';

export default (router: Router) => {
  router.post(`${ApiConstants.ApiBaseUrl}/auth`, createApiUser);
};
