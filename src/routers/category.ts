import express from 'express';
import { addCategory, getCategories } from '../controllers/category';
import { ApiConstants } from '../utils';

export default (router: express.Router) => {
  router.get(`${ApiConstants.ApiBaseUrl}/categories`, getCategories);
  router.post(`${ApiConstants.ApiBaseUrl}/categories`, addCategory);
};
