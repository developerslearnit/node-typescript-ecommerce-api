import { Router } from 'express';
import {
  createCustomer,
  getCustomerById,
  createCustomerAddress,
  updateCustomer,
} from '../controllers/customer';
import { ApiConstants } from '../utils';

export default (router: Router) => {
  router.get(`${ApiConstants.ApiBaseUrl}/customers/:id`, getCustomerById);
  router.post(`${ApiConstants.ApiBaseUrl}/customers`, createCustomer);
  router.post(
    `${ApiConstants.ApiBaseUrl}/customers/addresses`,
    createCustomerAddress
  );
  router.put(`${ApiConstants.ApiBaseUrl}/customers/:id`, updateCustomer);
};
