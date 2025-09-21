import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
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
            let accessToken: string | undefined =
                req.cookies?.accessToken ||
                req.headers.authorization?.split(" ")[1];

            if (!accessToken) {
                throw new ApiError(
                    StatusCodeEnum.UNAUTHORIZED,
                    "No token provided",
                );
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

    public async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = res.locals.tokenPayload;

            if (role !== RoleEnum.ADMIN) {
                throw new ApiError(
                    StatusCodeEnum.FORBIDDEN,
                    "Insufficient rights",
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
