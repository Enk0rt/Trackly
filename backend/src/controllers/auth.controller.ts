import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IAuth } from "../interfaces/auth.interface";
import { IUser, IUserWithTokens } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { isLoginUsernameOrEmail } from "../utils/isLoginUsernameOrEmail";

class AuthController {
    public async signUp(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const signUpData = req.body as Partial<IUser>;
            const newUser = await authService.signUp(signUpData);
            res.status(StatusCodeEnum.CREATED).json({
                data: newUser,
                details: "Sign-up is successful, user is created",
            });
        } catch (e) {
            next(e);
        }
    }

    public async signIn(
        req: Request,
        res: Response<IApiSuccessResponse<IUserWithTokens>>,
        next: NextFunction,
    ) {
        try {
            const signInData = req.body as Partial<IAuth>;
            const type = isLoginUsernameOrEmail(signInData.login);
            const newUser = await authService.signIn(signInData, type);
            res.status(StatusCodeEnum.CREATED).json({
                data: newUser,
                details: "Sign-in is successful",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
