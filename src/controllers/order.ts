import { Request, Response, NextFunction } from 'express';
import { db } from '../lib/db';
import { HttpCode, HttpError } from '../exceptions/http-error';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { custormer_id, total_price, orders_data } = req.body;
    await db.order.create({
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
      .status(HttpCode.OK)
      .json({ hasError: false, message: 'Order was created successfully' });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server Error ' + error.message,
      })
    );
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return next(
        new HttpError({
          httpCode: HttpCode.BAD_REQUEST,
          description: 'Bad request invalid order id',
        })
      );
    }

    const { status } = req.body;
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });

    return res
      .status(HttpCode.OK)
      .json({ hasError: false, message: 'Order updated successfully' });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server Error ' + error.message,
      })
    );
  }
};

export const getCustomerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.customerId;
    const result = await db.order.findMany({
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

    res.status(HttpCode.OK).json({ data: result, hasError: false });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server Error ' + error.message,
      })
    );
  }
};

export const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await db.order.findMany({
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
    res.status(HttpCode.OK).json({ data: result, hasError: false });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Internal server Error ' + error.message,
      })
    );
  }
};
