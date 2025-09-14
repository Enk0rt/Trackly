import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            details: err.message,
            field: err.field,
        });
    }

    res.status(500).json({
        details: "Internal server error",
    });
}
