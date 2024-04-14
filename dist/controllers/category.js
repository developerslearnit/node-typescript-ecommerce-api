"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = exports.getCategories = void 0;
const db_1 = require("../lib/db");
const http_error_1 = require("../exceptions/http-error");
const slugify_1 = __importDefault(require("slugify"));
const getCategories = async (req, res, next) => {
    try {
        const categories = await db_1.db.category.findMany({
            select: {
                id: true,
                meta_description: true,
                meta_title: true,
                image_url: true,
                slug: true,
                name: true,
            },
        });
        return res.status(http_error_1.HttpCode.OK).json({ hasError: false, data: categories });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server Error ' + error.message,
        }));
    }
};
exports.getCategories = getCategories;
const addCategory = async (req, res, next) => {
    try {
        const { name, meta_title, meta_description, image_url, description } = req.body;
        if (!name) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Category name is required',
            }));
        }
        const existingCategory = await db_1.db.category.findFirst({
            where: {
                name: name,
            },
        });
        if (existingCategory) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Category name already exists',
            }));
        }
        let slug = (0, slugify_1.default)(name);
        if (slug.length > 150) {
            slug = slug.substring(0, 150);
        }
        await db_1.db.category.create({
            data: {
                name,
                slug: slug,
                meta_title: meta_title,
                meta_description: meta_description,
                image_url: image_url,
                description: description,
            },
        });
        return res.status(http_error_1.HttpCode.OK).json({
            hasError: false,
            message: 'Product category was creted successfully',
        });
    }
    catch (error) {
        //console.log('[CATEGORY_ADD_ERROR]', error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server Error ' + error.message,
        }));
    }
};
exports.addCategory = addCategory;
//# sourceMappingURL=category.js.map