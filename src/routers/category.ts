import express from 'express';
import { addCategory, getCategories } from '../controllers/category';
export default (router: express.Router) => {
  router.get('/api/v1/categories', getCategories);
  router.post('/api/v1/categories', addCategory);
};
