import { Router } from 'express';
import category from './category';
import customer from './customer';
import product from './product';
import auth from './auth';
import { handleApiAuth } from '../middleware';

const router = Router();

export default (): Router => {
  auth(router);
  router.use(handleApiAuth);
  category(router);
  customer(router);
  product(router);

  return router;
};
