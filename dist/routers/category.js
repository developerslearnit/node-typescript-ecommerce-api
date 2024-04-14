"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../controllers/category");
const utils_1 = require("../utils");
exports.default = (router) => {
    router.get(`${utils_1.ApiConstants.ApiBaseUrl}/categories`, category_1.getCategories);
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/categories`, category_1.addCategory);
};
//# sourceMappingURL=category.js.map