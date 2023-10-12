import express from 'express';
import { getCategories } from '../controllers/category';
export default (router: express.Router) => {
  router.get('/api/v1/categories', getCategories);
};
