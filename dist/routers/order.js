"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../controllers/order");
const utils_1 = require("../utils");
exports.default = (router) => {
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/customers/orders/:customerId`, order_1.getCustomerOrders);
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/orders/:id`, order_1.getSingleOrder);
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/orders`, order_1.createOrder);
    router.put(`${utils_1.ApiConstants.ApiBaseUrl}/orders`, order_1.updateOrder);
};
//# sourceMappingURL=order.js.map