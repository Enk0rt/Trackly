import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { IApiSuccessResponse } from "../interfaces/api-success-responce.interface";
import {
    IHabitChecks,
    IHabitHistoryEntry,
} from "../interfaces/habit-history.interface";
import { ITokenPayload } from "../interfaces/tokens.interface";
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

    public async getHabitHistoryEntryById(
        req: Request,
        res: Response<IApiSuccessResponse<IHabitHistoryEntry>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const habit =
                await habitHistoryService.getHabitHistoryEntryById(id);
            res.status(StatusCodeEnum.OK).json({ data: habit });
        } catch (e) {
            next(e);
        }
    }

    public async getHabitHistoryById(
        req: Request,
        res: Response<IApiSuccessResponse<IHabitHistoryEntry[]>>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const habit = await habitHistoryService.getHabitHistoryById(id);
            res.status(StatusCodeEnum.OK).json({ data: habit });
        } catch (e) {
            next(e);
        }
    }

    public async getHabitChecks(
        req: Request,
        res: Response<IApiSuccessResponse<IHabitChecks[]>>,
        next: NextFunction,
    ) {
        try {
            const { _userId } = res.locals.tokenPayload as ITokenPayload;
            const data = await habitHistoryService.getHabitChecks(
                String(_userId),
            );
            res.status(StatusCodeEnum.OK).json({ data });
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
            const habitEntry = await habitHistoryService.create({
                ...createData,
                _habitId: id,
            });
            res.status(StatusCodeEnum.OK).json({
                data: habitEntry,
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
