import { endOfDay, endOfToday, startOfDay, startOfToday } from "date-fns";
import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/tokens.interface";
import { Habit } from "../models/habit.model";
import { HabitHistory } from "../models/habit-history.model";
import { userService } from "../services/user.service";

class StreakMiddleware {
    public async checkHabitStreak(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { _userId } = res.locals.tokenPayload as ITokenPayload;

            const user = await userService.getById(String(_userId));

            if (!user) {
                throw new ApiError(
                    StatusCodeEnum.NOT_FOUND,
                    "User is not found",
                );
            }

            await Promise.all(
                user.habits.map(async (habitId) => {
                    const habit = await Habit.findById(String(habitId));
                    if (!habitId) {
                        throw new ApiError(
                            StatusCodeEnum.NOT_FOUND,
                            "Habit is not found",
                        );
                    }

                    const todayStart = startOfToday();
                    const todayEnd = endOfToday();

                    const habitHistoryToday = await HabitHistory.findOne({
                        _habitId: habit._id,
                        date: { $gte: todayStart, $lte: todayEnd },
                    });
                    const habitHistoryYesterday = await HabitHistory.findOne({
                        _habitId: habit._id,
                        date: {
                            $gte: startOfDay(
                                new Date(Date.now() - 24 * 60 * 60 * 1000),
                            ),
                            $lte: endOfDay(
                                new Date(Date.now() - 24 * 60 * 60 * 1000),
                            ),
                        },
                    });

                    if (!habitHistoryToday && !habitHistoryYesterday) {
                        habit.streak = 0;
                        await habit.save();
                    }
                }),
            );
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const streakMiddleware = new StreakMiddleware();
