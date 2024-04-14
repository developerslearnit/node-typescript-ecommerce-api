"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.handleApiAuth = void 0;
const db_1 = require("../lib/db");
const error_handler_1 = require("../exceptions/error-handler");
const http_error_1 = require("../exceptions/http-error");
const handleApiAuth = async (req, res, next) => {
    const apiKey = req.headers['x-simplexit-api-key'];
    if (!apiKey) {
        return res
            .status(http_error_1.HttpCode.UNAUTHORIZED)
            .json({ description: 'UnAuthorized' });
    }
    const keyFromHeader = apiKey.toString();
    const apiUserKey = await db_1.db.apiClient.findFirst({
        where: {
            api_key: keyFromHeader,
        },
        select: {
            api_key: true,
            id: true,
            email: true,
        },
    });
    if (!apiUserKey) {
        return res
            .status(http_error_1.HttpCode.UNAUTHORIZED)
            .json({ description: 'UnAuthorized' });
    }
    console.log(JSON.stringify(apiUserKey));
    const API_KEY = apiUserKey.api_key;
    if (apiKey !== API_KEY) {
        return res
            .status(http_error_1.HttpCode.UNAUTHORIZED)
            .json({ description: 'UnAuthorized' });
    }
    return next();
};
exports.handleApiAuth = handleApiAuth;
const handleErrors = (err, req, res, next) => {
    error_handler_1.errorHandler.handleError(err, res);
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=index.js.map