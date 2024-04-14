"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiUser = void 0;
const db_1 = require("../lib/db");
const http_error_1 = require("../exceptions/http-error");
const utils_1 = require("../utils");
/**
 * This function creates API user
 * @param req
 * @param res
 * @param next
 * @returns {object} response object
 */
const createApiUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email } = req.body;
        if (!first_name) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: "Customer id is required",
            });
        }
        if (!email) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: "Customer email is required",
            });
        }
        const apiKey = await (0, utils_1.generateApiKey)();
        await db_1.db.apiClient.create({
            data: {
                first_name: first_name,
                email,
                last_name: last_name,
                api_key: apiKey,
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: "API user created" });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: "Internal server error",
        }));
    }
};
exports.createApiUser = createApiUser;
//# sourceMappingURL=auth.js.map