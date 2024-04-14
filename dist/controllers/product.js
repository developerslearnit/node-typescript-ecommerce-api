"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductImage = exports.uploadProductImages = exports.createProduct = exports.getProductBySlug = exports.getProducts = exports.getProductsByCategorySlug = void 0;
const db_1 = require("../lib/db");
const http_error_1 = require("../exceptions/http-error");
const slugify_1 = __importDefault(require("slugify"));
const getProductsByCategorySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        if (!slug) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Category id is required',
            }));
        }
        const query = req.query;
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {};
        const totalCount = await db_1.db.product.count();
        if (endIndex < totalCount) {
            result.next = {
                page: page,
                limit: limit,
            };
        }
        if (startIndex > 0 && endIndex < totalCount) {
            result.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        const selectedCategory = await db_1.db.category.findUnique({
            where: {
                slug: slug,
            },
        });
        if (!selectedCategory) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.NOT_FOUND,
                description: 'No category found',
            }));
        }
        const products = await db_1.db.product.findMany({
            where: {
                category_id: selectedCategory.id,
            },
            skip: startIndex,
            take: limit,
            select: {
                id: true,
                name: true,
                slug: true,
                category_id: true,
                price: true,
                old_price: true,
                image_url: true,
                description: true,
                rating: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        result.data = products;
        return res.status(http_error_1.HttpCode.OK).json(result);
    }
    catch (error) {
        console.log('PRODUCERROR', error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.getProductsByCategorySlug = getProductsByCategorySlug;
const getProducts = async (req, res, next) => {
    try {
        const query = req.query;
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {};
        const totalCount = await db_1.db.product.count();
        if (endIndex < totalCount) {
            result.next = {
                page: page,
                limit: limit,
            };
        }
        if (startIndex > 0 && endIndex < totalCount) {
            result.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        const products = await db_1.db.product.findMany({
            skip: startIndex,
            take: limit,
            select: {
                id: true,
                name: true,
                slug: true,
                category_id: true,
                price: true,
                old_price: true,
                image_url: true,
                description: true,
                rating: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        result.data = products;
        return res.status(http_error_1.HttpCode.OK).json(result);
    }
    catch (error) {
        console.log('PRODUCERROR', error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.getProducts = getProducts;
const getProductBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        if (!slug) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Invalid product slug',
            }));
        }
        const selectedProduct = await db_1.db.product.findUnique({
            where: {
                slug: slug,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                category_id: true,
                price: true,
                old_price: true,
                image_url: true,
                description: true,
                rating: true,
                images: {
                    select: {
                        id: true,
                        image_url: true,
                        product_id: true,
                    },
                },
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ data: selectedProduct, hasError: false });
    }
    catch (error) {
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.getProductBySlug = getProductBySlug;
const createProduct = async (req, res, next) => {
    try {
        const { name, price, old_price, category_id, image_url } = req.body;
        let slug = (0, slugify_1.default)(name).toLowerCase();
        if (slug.length > 150) {
            slug = slug.substring(0, 150);
        }
        await db_1.db.product.create({
            data: {
                name,
                price,
                slug,
                old_price: old_price,
                category_id: category_id,
                image_url: image_url,
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ message: 'Product created successfully', hasError: false });
    }
    catch (error) {
        console.log(error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.createProduct = createProduct;
const uploadProductImages = async (req, res, next) => {
    try {
        await db_1.db.productImage.createMany({
            data: req.body,
            skipDuplicates: true,
        });
        res.status(http_error_1.HttpCode.OK).json({
            hasError: false,
            message: 'Product images was uploaded successfully',
        });
    }
    catch (error) {
        console.log(error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.uploadProductImages = uploadProductImages;
const deleteProductImage = async (req, res, next) => {
    try {
        const imageId = req.params.id;
        if (!imageId) {
            return next(new http_error_1.HttpError({
                httpCode: http_error_1.HttpCode.BAD_REQUEST,
                description: 'Image Id is required',
            }));
        }
        await db_1.db.productImage.delete({
            where: {
                id: imageId,
            },
        });
        return res
            .status(http_error_1.HttpCode.OK)
            .json({ hasError: false, message: 'Image deleted' });
    }
    catch (error) {
        console.log(error);
        next(new http_error_1.HttpError({
            httpCode: http_error_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }));
    }
};
exports.deleteProductImage = deleteProductImage;
//# sourceMappingURL=product.js.map