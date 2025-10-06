import { NextFunction, Request, Response } from "express";
import { DeleteResult, UpdateResult } from "mongoose";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { ITokenPayload } from "../interfaces/tokens.interface";
import { IUser } from "../interfaces/user.interface";
import { adminService } from "../services/admin.service";

export class AdminController {
    public async getUsersWithQuery(
        req: Request,
        res: Response<IApiSuccessResponse<IUser[]>>,
        next: NextFunction,
    ) {
        try {
            const query = req.query;
            const currentUserId = res.locals.tokenPayload
                ._userId as ITokenPayload;
            const data = await adminService.getUsersWithQuery(
                query,
                String(currentUserId),
            );
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async blockOneUser(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = await adminService.blockOneUser(id);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "User is blocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async blockManyUsers(
        req: Request,
        res: Response<
            IApiSuccessResponse<{ users: IUser[]; updateResult: UpdateResult }>
        >,
        next: NextFunction,
    ) {
        try {
            const { ids } = req.body;
            const [users, result] = await adminService.blockManyUsers(ids);
            res.status(StatusCodeEnum.OK).json({
                data: { users, updateResult: result },
                details: "Users are blocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async unblockOneUser(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = await adminService.unblockOneUser(id);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "User is blocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async unblockManyUsers(
        req: Request,
        res: Response<
            IApiSuccessResponse<{ users: IUser[]; updateResult: UpdateResult }>
        >,
        next: NextFunction,
    ) {
        try {
            const { ids } = req.body;
            const [users, result] = await adminService.unblockManyUsers(ids);
            res.status(StatusCodeEnum.OK).json({
                data: { users, updateResult: result },
                details: "Users are unblocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async verifyOneUser(
        req: Request,
        res: Response<IApiSuccessResponse<IUser>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = await adminService.verifyOneUser(id);
            res.status(StatusCodeEnum.OK).json({
                data: user,
                details: "User is blocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async verifyManyUsers(
        req: Request,
        res: Response<
            IApiSuccessResponse<{ users: IUser[]; updateResult: UpdateResult }>
        >,
        next: NextFunction,
    ) {
        try {
            const { ids } = req.body;
            const [users, result] = await adminService.verifyManyUsers(ids);
            res.status(StatusCodeEnum.OK).json({
                data: { users, updateResult: result },
                details: "Users are unblocked successfully",
            });
        } catch (e) {
            next(e);
        }
    }

    public async sendVerifyRequest(
        req: Request,
        res: Response<IApiSuccessResponse<void>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.body;
            await adminService.sendVerifyRequest(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "Verification request was send to a user email",
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
                details: `User role is successfully changed to ${role}`,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const adminController = new AdminController();
