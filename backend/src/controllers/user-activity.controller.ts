import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IUserActivity } from "../interfaces/user-activity.interface";
import { userActivityService } from "../services/user-activity.service";

class UserActivityController {
    public async getAll(
        req: Request,
        res: Response<IApiSuccessResponse<IUserActivity[]>>,
        next: NextFunction,
    ) {
        try {
            const userActivities = await userActivityService.getAll();
            res.status(StatusCodeEnum.OK).json({ data: userActivities });
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response<IApiSuccessResponse<IUserActivity>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const userActivity = await userActivityService.getById(id);
            res.status(StatusCodeEnum.OK).json({ data: userActivity });
        } catch (e) {
            next(e);
        }
    }

    public async delete(
        req: Request,
        res: Response<IApiSuccessResponse<void>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            await userActivityService.delete(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "User activity is successfully deleted",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const userActivityController = new UserActivityController();
