"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const utils_1 = require("../utils");
exports.default = (router) => {
    router.post(`${utils_1.ApiConstants.ApiBaseUrl}/auth`, auth_1.createApiUser);
};
//# sourceMappingURL=auth.js.map