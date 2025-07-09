import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IPlan } from "../interfaces/plan.interface";
import { ITokenPayload } from "../interfaces/tokens.interface";
import { planService } from "../services/plan.service";

class PlanController {
    public async getAll(
        req: Request,
        res: Response<IApiSuccessResponse<IPlan[]>>,
        next: NextFunction,
    ) {
        try {
            const plans = await planService.getAll();
            res.status(StatusCodeEnum.OK).json({ data: plans });
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response<IApiSuccessResponse<IPlan>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const plan = await planService.getById(id);
            res.status(StatusCodeEnum.OK).json({ data: plan });
        } catch (e) {
            next(e);
        }
    }

    public async create(
        req: Request,
        res: Response<IApiSuccessResponse<IPlan>>,
        next: NextFunction,
    ) {
        try {
            const { _userId } = req.res.locals.tokenPayload as ITokenPayload;
            const createData = req.body;
            const plan = await planService.create({ ...createData, _userId });
            res.status(StatusCodeEnum.OK).json({
                data: plan,
            });
        } catch (e) {
            next(e);
        }
    }

    public async update(
        req: Request,
        res: Response<IApiSuccessResponse<IPlan>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const plan = await planService.update(id, updateData);
            res.status(StatusCodeEnum.OK).json({ data: plan });
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
            await planService.delete(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "Plan is successfully deleted",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const planController = new PlanController();
