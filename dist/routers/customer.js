"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../controllers/customer");
const utils_1 = require("../utils");
exports.default = (router) => {
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/customers/:id`, customer_1.getCustomerById);
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/customers`, customer_1.createCustomer);
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/customers/addresses`, customer_1.createCustomerAddress);
    router.put(`${utils_1.ApiConstants.ApiBaseUrl}/customers/:id`, customer_1.updateCustomer);
};
//# sourceMappingURL=customer.js.map