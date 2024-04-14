import { Request, Response, NextFunction } from 'express';
import { db } from '../lib/db';
import { HttpCode, HttpError } from '../exceptions/http-error';
import slugify from 'slugify';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        meta_description: true,
        meta_title: true,
        image_url: true,
        slug: true,
        name: true,
      },
    });

    return res.status(HttpCode.OK).json({ hasError: false, data: categories });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server Error ' + error.message,
      })
    );
  }
};

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, meta_title, meta_description, image_url, description } =
      req.body;

    if (!name) {
      return next(
        new HttpError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Category name is required',
        })
      );
    }

    const existingCategory = await db.category.findFirst({
      where: {
        name: name,
      },
    });

    if (existingCategory) {
      return next(
        new HttpError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Category name already exists',
        })
      );
    }

    let slug = slugify(name);

    if (slug.length > 150) {
      slug = slug.substring(0, 150);
    }

    await db.category.create({
      data: {
        name,
        slug: slug,
        meta_title: meta_title,
        meta_description: meta_description,
        image_url: image_url,
        description: description,
      },
    });
    return res.status(HttpCode.OK).json({
      hasError: false,
      message: 'Product category was creted successfully',
    });
  } catch (error) {
    //console.log('[CATEGORY_ADD_ERROR]', error);
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server Error ' + error.message,
      })
    );
  }
};
