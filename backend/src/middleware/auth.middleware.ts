import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            let accessToken: string | undefined;

            if (req.cookies?.accessToken) {
                accessToken = req.cookies.accessToken;
            }

            if (!accessToken && req.headers.authorization) {
                accessToken = req.headers.authorization.split(" ")[1];
            }

            if (!accessToken) {
                throw new ApiError(
                    StatusCodeEnum.UNAUTHORIZED,
                    "No token provided",
                );
            }

            const tokenPayload = tokenService.verifyToken(
                accessToken,
                TokenTypeEnum.ACCESS,
            );

            const isTokenExists = await tokenService.isExists(
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            if (!isTokenExists) {
                throw new ApiError(StatusCodeEnum.FORBIDDEN, "Invalid token");
            }

            res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const refreshToken = req.cookies["refreshToken"];
            if (!refreshToken) {
                throw new ApiError(
                    StatusCodeEnum.UNAUTHORIZED,
                    "Refresh token is not provided",
                );
            }

            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );

            const isTokenExists = await tokenService.isExists(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );
            if (!isTokenExists) {
                throw new ApiError(StatusCodeEnum.FORBIDDEN, "Invalid token");
            }

            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
