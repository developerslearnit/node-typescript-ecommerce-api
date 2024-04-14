import { Router } from 'express';
import {
  createProduct,
  deleteProductImage,
  getProductBySlug,
  getProducts,
  uploadProductImages,
  getProductsByCategorySlug,
} from '../controllers/product';
import { ApiConstants } from '../utils';

export default (router: Router) => {
  router.get(`${ApiConstants.ApiBaseUrl}/products`, getProducts);
  router.get(`${ApiConstants.ApiBaseUrl}/products/:slug`, getProductBySlug);
  router.post(`${ApiConstants.ApiBaseUrl}/products`, createProduct);
  router.post(
    `${ApiConstants.ApiBaseUrl}/products/images`,
    uploadProductImages
  );
  router.delete(
    `${ApiConstants.ApiBaseUrl}/products/images/:id`,
    deleteProductImage
  );
  //Get product categoris
  router.get(
    `${ApiConstants.ApiBaseUrl}/products/categories/:slug`,
    getProductsByCategorySlug
  );
};
