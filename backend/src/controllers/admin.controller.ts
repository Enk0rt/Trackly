import { NextFunction, Request, Response } from "express";
import { DeleteResult } from "mongoose";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IUser } from "../interfaces/user.interface";
import { adminService } from "../services/admin.service";

export class AdminController {
    public async getUsers(
        req: Request,
        res: Response<IApiSuccessResponse<IUser[]>>,
        next: NextFunction,
    ) {
        try {
            const users = await adminService.getUsers();
            res.status(StatusCodeEnum.OK).json({ data: users });
        } catch (e) {
            next(e);
        }
    }

    public async blockUser(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = await adminService.blockUser(id);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "User is blocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async unblockUser(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = await adminService.unblockUser(id);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "User is blocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOneUser(
        req: Request,
        res: Response<IApiSuccessResponse<void>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            await adminService.deleteOneUser(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "User is deleted successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteManyUsers(
        req: Request,
        res: Response<IApiSuccessResponse<DeleteResult>>,
        next: NextFunction,
    ) {
        try {
            const { ids } = req.body;
            const result = await adminService.deleteManyUsers(ids);
            res.status(StatusCodeEnum.OK).json({
                data: result,
                details: "Users are deleted successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async changeRole(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const user = await adminService.changeRole(id, role);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: `User is successfully promoted to ${role}`,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const adminController = new AdminController();
