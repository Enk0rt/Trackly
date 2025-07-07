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
        const users = await userService.getAll();
        res.status(StatusCodeEnum.OK).json({ data: users });
    }

    public async getById(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        const { id } = req.params;
        const user = await userService.getById(id);
        res.status(StatusCodeEnum.OK).json({ data: user });
    }

    public async delete(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        const { id } = req.params;
        await userService.delete(id);
        res.status(StatusCodeEnum.OK).json({
            data: null,
            details: "User is successfully deleted",
        });
    }
}

export const userController = new UserController();
