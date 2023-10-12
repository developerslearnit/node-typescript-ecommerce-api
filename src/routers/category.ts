import express from 'express';
import { addCategory, getCategories } from '../controllers/category';
import { handleApiAuth } from '../middleware';
import { ApiConstants } from '../utils';
export default (router: express.Router) => {
  router.get(
    `${ApiConstants.ApiBaseUrl}/categories`,
    handleApiAuth,
    getCategories
  );
  router.post(
    `${ApiConstants.ApiBaseUrl}/categories`,
    handleApiAuth,
    addCategory
  );
};
