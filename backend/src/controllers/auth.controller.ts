import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IAuth } from "../interfaces/auth.interface";
import { IHabit } from "../interfaces/habit.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/tokens.interface";
import { IUser, IUserWithTokens } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { habitService } from "../services/habit.service";
import { tokenService } from "../services/token.service";
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
            res.status(StatusCodeEnum.OK)
                .cookie("accessToken", newUser.tokens.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 15,
                })
                .cookie("refreshToken", newUser.tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                })
                .json({
                    data: newUser,
                    details: "Sign-in is successful",
                });
        } catch (e) {
            next(e);
        }
    }

    public async me(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const payload = req.res.locals.tokenPayload as ITokenPayload;
            const { _userId } = payload;
            const user = await authService.me(String(_userId));
            res.status(StatusCodeEnum.OK).json({ data: user });
        } catch (e) {
            next(e);
        }
    }

    public async getMyHabits(
        req: Request,
        res: Response<IApiSuccessResponse<IHabit[]>>,
        next: NextFunction,
    ) {
        try {
            const { _userId } = res.locals.tokenPayload as ITokenPayload;
            const habits = await habitService.getUserHabits(String(_userId));
            res.status(StatusCodeEnum.OK).json({
                data: habits,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateMe(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const payload = req.res.locals.tokenPayload as ITokenPayload;
            const { _userId } = payload;
            const updateData = req.body as Partial<IUser>;
            const user = await authService.updateMe(
                String(_userId),
                updateData,
            );

            res.status(StatusCodeEnum.OK).json({ data: user });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(
        req: Request,
        res: Response<IApiSuccessResponse<ITokenPair>>,
        next: NextFunction,
    ) {
        try {
            const { _userId, username, role } = req.res.locals
                .tokenPayload as ITokenPayload;
            const tokens = tokenService.generateTokens({
                _userId,
                username,
                role,
            });
            res.status(StatusCodeEnum.OK)
                .cookie("accessToken", tokens.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 15,
                })
                .cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                })
                .json({
                    data: tokens,
                    details: "Tokens were refreshed successfully",
                });
        } catch (e) {
            next(e);
        }
    }

    public async logout(
        req: Request,
        res: Response<IApiSuccessResponse<null>>,
        next: NextFunction,
    ) {
        try {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 15,
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "Logged out",
            });
        } catch (e) {
            next(e);
        }
    }

    public async verifyEmail(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { token } = req.params;
            const user = await authService.verifyEmail(token);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "Email is successfully verified",
            });
        } catch (e) {
            next(e);
        }
    }

    public async sendVerifyEmailRequest(
        req: Request,
        res: Response<IApiSuccessResponse<void>>,
        next: NextFunction,
    ) {
        try {
            const { email } = req.body;
            await authService.sendVerifyEmailRequest(email);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details:
                    "Email verification request is successfully sent,check your email",
            });
        } catch (e) {
            next(e);
        }
    }

    public async sendRecoveryRequest(
        req: Request,
        res: Response<IApiSuccessResponse<void>>,
        next: NextFunction,
    ) {
        try {
            const { email } = req.body;
            await authService.sendRecoveryRequest(email);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details:
                    "Password recovery request is successfully sent, check your email",
            });
        } catch (e) {
            next(e);
        }
    }

    public async validatePasswordRecoveryToken(
        req: Request,
        res: Response<IApiSuccessResponse<ITokenPayload>>,
        next: NextFunction,
    ) {
        try {
            const { token } = req.params;
            const payload = tokenService.verifyToken(
                token,
                TokenTypeEnum.RECOVERY,
            );
            res.status(StatusCodeEnum.OK).json({
                data: payload,
                details: "Password is changed successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async recoverPasswordFromEmail(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { newPass } = req.body;
            const { token } = req.params;
            const user = await authService.recoverPasswordFromEmail(
                token,
                newPass,
            );
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "Password is changed successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async changePasswordFromProfile(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { oldPass, newPass } = req.body;
            const token = req.cookies["accessToken"];
            const user = await authService.changePasswordFromProfile(
                token,
                oldPass,
                newPass,
            );
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "Password is changed successfully",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
