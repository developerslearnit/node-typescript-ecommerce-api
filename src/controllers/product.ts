import { Request, Response, NextFunction } from 'express';
import { db } from '../lib/db';
import { HttpCode, HttpError } from '../exceptions/http-error';
import slugify from 'slugify';

export const getProductsByCategorySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      return next(
        new HttpError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Category id is required',
        })
      );
    }

    const query = req.query;
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result: any = {};
    const totalCount = await db.product.count();

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

    const selectedCategory = await db.category.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!selectedCategory) {
      return next(
        new HttpError({
          httpCode: HttpCode.NOT_FOUND,
          description: 'No category found',
        })
      );
    }
    const products = await db.product.findMany({
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

    return res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.log('PRODUCERROR', error);
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
      })
    );
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result: any = {};
    const totalCount = await db.product.count();

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

    const products = await db.product.findMany({
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

    return res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.log('PRODUCERROR', error);
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
      })
    );
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      return next(
        new HttpError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Invalid product slug',
        })
      );
    }
    const selectedProduct = await db.product.findUnique({
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
      .status(HttpCode.OK)
      .json({ data: selectedProduct, hasError: false });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
      })
    );
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, old_price, category_id, image_url } = req.body;
    let slug = slugify(name).toLowerCase();
    if (slug.length > 150) {
      slug = slug.substring(0, 150);
    }
    await db.product.create({
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
      .status(HttpCode.OK)
      .json({ message: 'Product created successfully', hasError: false });
  } catch (error) {
    console.log(error);
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
      })
    );
  }
};

export const uploadProductImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.productImage.createMany({
      data: req.body,
      skipDuplicates: true,
    });

    res.status(HttpCode.OK).json({
      hasError: false,
      message: 'Product images was uploaded successfully',
    });
  } catch (error) {
    console.log(error);
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
      })
    );
  }
};

export const deleteProductImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageId = req.params.id;

    if (!imageId) {
      return next(
        new HttpError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Image Id is required',
        })
      );
    }

    await db.productImage.delete({
      where: {
        id: imageId,
      },
    });

    return res
      .status(HttpCode.OK)
      .json({ hasError: false, message: 'Image deleted' });
  } catch (error) {
    console.log(error);
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
      })
    );
  }
};
