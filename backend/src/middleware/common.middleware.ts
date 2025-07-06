import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ZodSchema } from "zod";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public validateBody(validator: ZodSchema<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (!req.body) {
                throw new ApiError(
                    StatusCodeEnum.BAD_REQUEST,
                    "At least one field must be provided",
                );
            }

            const result = validator.safeParse(req.body);

            if (!result.success) {
                const messages = result.error.errors
                    .map((e) => e.message)
                    .join(", ");
                return next(new ApiError(StatusCodeEnum.BAD_REQUEST, messages));
            }

            req.body = result.data;
            next();
        };
    }

    public isValidated(key: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(
                        StatusCodeEnum.BAD_REQUEST,
                        `Invalid ${key}`,
                    );
                }
            } catch (e) {
                next(e);
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
