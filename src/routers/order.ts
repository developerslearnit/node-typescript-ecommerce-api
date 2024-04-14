import express from 'express';
import {
  createOrder,
  getCustomerOrders,
  getSingleOrder,
  updateOrder,
} from '../controllers/order';
import { ApiConstants } from '../utils';

export default (router: express.Router) => {
  router.get(
    `${ApiConstants.ApiBaseUrl}/customers/orders/:customerId`,
    getCustomerOrders
  );

  router.get(`${ApiConstants.ApiBaseUrl}/orders/:id`, getSingleOrder);
  router.post(`${ApiConstants.ApiBaseUrl}/orders`, createOrder);
  router.put(`${ApiConstants.ApiBaseUrl}/orders`, updateOrder);
};
