"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.getCustomerById = exports.createCustomerAddress = exports.createCustomer = void 0;
const db_1 = require("../lib/db");
const http_error_1 = require("../exceptions/http-error");
const createCustomer = async (req, res, next) => {
    try {
        const { customer_id, first_name, last_name, email, avatar_url } = req.body;
        if (!first_name) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Customer id is required',
            });
        }
        if (!email) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Customer email is required',
            });
        }
        await db_1.db.customer.create({
            data: {
                customer_id: customer_id,
                first_name: first_name,
                email,
                last_name: last_name,
                avatar_url: avatar_url,
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: 'Customer created' });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.createCustomer = createCustomer;
const createCustomerAddress = async (req, res, next) => {
    try {
        const { customer_id, address_line1, address_line2, address_type, city, state, country, zip_code, is_default, } = req.body;
        if (!customer_id) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Customer id is required',
            });
        }
        await db_1.db.customer.update({
            where: {
                customer_id: customer_id,
            },
            data: {
                addresses: {
                    create: {
                        address_1: address_line1,
                        address_2: address_line2,
                        city,
                        state,
                        country,
                        zip_code: zip_code,
                        is_default: is_default,
                        address_type: address_type,
                    },
                },
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: 'Customer address created' });
    }
    catch (error) {
        console.log(error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.createCustomerAddress = createCustomerAddress;
const getCustomerById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Customer id is required',
            });
        }
        const selectedCustomer = await db_1.db.customer.findUnique({
            where: {
                customer_id: id,
            },
            select: {
                addresses: true,
                avatar_url: true,
                customer_id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                id: true,
            },
        });
        if (!selectedCustomer) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.NOT_FOUND,
                description: 'Customer not found',
            });
        }
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, data: selectedCustomer });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.getCustomerById = getCustomerById;
const updateCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Customer id is required',
            });
        }
        const { first_name, last_name } = req.body;
        await db_1.db.customer.update({
            where: {
                customer_id: id,
            },
            data: {
                first_name: first_name,
                last_name: last_name,
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: 'Customer updated' });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.updateCustomer = updateCustomer;
//# sourceMappingURL=customer.js.map