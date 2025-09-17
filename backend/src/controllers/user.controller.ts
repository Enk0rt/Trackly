import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(
        req: Request,
        res: Response<IApiSuccessResponse<IUser[]>>,
        next: NextFunction,
    ) {
        try {
            const users = await userService.getAll();
            res.status(StatusCodeEnum.OK).json({ data: users });
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = await userService.getById(id);
            res.status(StatusCodeEnum.OK).json({ data: user });
        } catch (e) {
            next(e);
        }
    }

    public async getByUsername(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { username } = req.params;
            const user = await userService.getByUsername(username);
            res.status(StatusCodeEnum.OK).json({ data: user });
        } catch (e) {
            next(e);
        }
    }

    public async delete(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            await userService.delete(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "User is successfully deleted",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
