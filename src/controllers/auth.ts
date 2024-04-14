import { Request, Response, NextFunction } from "express";
import { db } from "../lib/db";
import { HttpCode, HttpError } from "../exceptions/http-error";
import { generateApiKey } from "../utils";

/**
 * This function creates API user
 * @param req
 * @param res
 * @param next
 * @returns {object} response object
 */
export const createApiUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, email } = req.body;
    if (!first_name) {
      throw new HttpError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Customer id is required",
      });
    }

    if (!email) {
      throw new HttpError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Customer email is required",
      });
    }

    const apiKey = await generateApiKey();

    await db.apiClient.create({
      data: {
        first_name: first_name,
        email,
        last_name: last_name,
        api_key: apiKey,
      },
    });
    return res
      .status(HttpCode.OK)
      .json({ hasError: false, message: "API user created" });
  } catch (error) {
    next(
      new HttpError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "Internal server error",
      })
    );
  }
};
