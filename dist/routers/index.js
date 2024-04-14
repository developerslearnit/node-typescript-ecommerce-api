"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const customer_1 = __importDefault(require("./customer"));
const product_1 = __importDefault(require("./product"));
const auth_1 = __importDefault(require("./auth"));
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.default = () => {
    (0, auth_1.default)(router);
    router.use(middleware_1.handleApiAuth);
    (0, category_1.default)(router);
    (0, customer_1.default)(router);
    (0, product_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map