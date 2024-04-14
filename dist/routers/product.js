"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../controllers/product");
const utils_1 = require("../utils");
exports.default = (router) => {
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/products`, product_1.getProducts);
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/products/:slug`, product_1.getProductBySlug);
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/products`, product_1.createProduct);
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/products/images`, product_1.uploadProductImages);
    router.delete(`${utils_1.ApiConstants.ApiBaseUrl}/products/images/:id`, product_1.deleteProductImage);
    //Get product categoris
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/products/categories/:slug`, product_1.getProductsByCategorySlug);
};
//# sourceMappingURL=product.js.map