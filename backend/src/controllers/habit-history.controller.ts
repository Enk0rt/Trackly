import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import { IHabitHistoryEntry } from "../interfaces/habit-history.interface";
import { habitHistoryService } from "../services/habit-history.service";

class HabitHistoryController {
    public async getAll(
        req: Request,
        res: Response<IApiSuccessResponse<IHabitHistoryEntry[]>>,
        next: NextFunction,
    ) {
        try {
            const habits = await habitHistoryService.getAll();
            res.status(StatusCodeEnum.OK).json({ data: habits });
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response<IApiSuccessResponse<IHabitHistoryEntry>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const habit = await habitHistoryService.getById(id);
            res.status(StatusCodeEnum.OK).json({ data: habit });
        } catch (e) {
            next(e);
        }
    }

    public async create(
        req: Request,
        res: Response<IApiSuccessResponse<IHabitHistoryEntry>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const createData = req.body;
            const habit = await habitHistoryService.create({
                ...createData,
                _habitId: id,
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
        res: Response<IApiSuccessResponse<IHabitHistoryEntry>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            await habitHistoryService.delete(id);
            res.status(StatusCodeEnum.OK).json({
                data: null,
                details: "Habit history entry is deleted successfully",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const habitHistoryController = new HabitHistoryController();
