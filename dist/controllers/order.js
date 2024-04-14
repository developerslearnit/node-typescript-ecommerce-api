"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleOrder = exports.getCustomerOrders = exports.updateOrder = exports.createOrder = void 0;
const db_1 = require("../lib/db");
const http_error_1 = require("../exceptions/http-error");
const createOrder = async (req, res, next) => {
    try {
        const { custormer_id, total_price, orders_data } = req.body;
        await db_1.db.order.create({
            data: {
                custormer_id: custormer_id,
                total_price: total_price,
                orderItems: {
                    createMany: {
                        data: orders_data,
                    },
                },
            },
        });
        res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: 'Order was created successfully' });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server Error ' + error.message,
        }));
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Bad request invalid order id',
            }));
        }
        const { status } = req.body;
        await db_1.db.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: status,
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: 'Order updated successfully' });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server Error ' + error.message,
        }));
    }
};
exports.updateOrder = updateOrder;
const getCustomerOrders = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const result = await db_1.db.order.findMany({
            where: {
                custormer_id: customerId,
            },
            select: {
                id: true,
                status: true,
                total_price: true,
                orderItems: {
                    select: {
                        id: true,
                        order_id: true,
                        product_id: true,
                        quantity: true,
                    },
                },
            },
        });
        res.status(http_error_1.HttpCode.OK).json({ data: result, hasError: false });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server Error ' + error.message,
        }));
    }
};
exports.getCustomerOrders = getCustomerOrders;
const getSingleOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await db_1.db.order.findMany({
            where: {
                id: id,
            },
            select: {
                id: true,
                status: true,
                total_price: true,
                orderItems: {
                    select: {
                        id: true,
                        order_id: true,
                        product_id: true,
                        quantity: true,
                    },
                },
            },
        });
        res.status(http_error_1.HttpCode.OK).json({ data: result, hasError: false });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server Error ' + error.message,
        }));
    }
};
exports.getSingleOrder = getSingleOrder;
//# sourceMappingURL=order.js.map