import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IHabit } from "../interfaces/habit.interface";
import { ITokenPayload } from "../interfaces/tokens.interface";
import { habitService } from "../services/habit.service";

class HabitController {
    public async getAll(
        req: Request,
        res: Response<IApiSuccessResponse<IHabit[]>>,
        next: NextFunction,
    ) {
        try {
            const habits = await habitService.getAll();
            res.status(StatusCodeEnum.OK).json({ data: habits });
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response<IApiSuccessResponse<IHabit>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const habit = await habitService.getById(id);
            res.status(StatusCodeEnum.OK).json({ data: habit });
        } catch (e) {
            next(e);
        }
    }

    public async create(
        req: Request,
        res: Response<IApiSuccessResponse<IHabit>>,
        next: NextFunction,
    ) {
        try {
            const { _userId } = res.locals.tokenPayload as ITokenPayload;
            const createData = req.body;
            const habit = await habitService.create({
                ...createData,
                _userId,
            });
            res.status(StatusCodeEnum.OK).json({
                data: habit,
            });
        } catch (e) {
            next(e);
        }
    }

    public async delete(
        req: Request,
        res: Response<IApiSuccessResponse<IHabit>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            await habitService.delete(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "Habit is deleted successfully",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const habitController = new HabitController();
