import { endOfDay, endOfToday, startOfDay, startOfToday } from "date-fns";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { HabitHistory } from "../models/habit-history.model";
import { habitService } from "../services/habit.service";

export const increaseStreak = async (habitId: string): Promise<number> => {
    const todayStart = startOfToday();
    const todayEnd = endOfToday();

    const habitHistoryToday = await HabitHistory.findOne({
        _habitId: habitId,
        date: { $gte: todayStart, $lte: todayEnd },
    });
    const habit = await habitService.getById(habitId);
    if (!habit) {
        throw new ApiError(StatusCodeEnum.NOT_FOUND, "Habit is not found");
    }

    let newStreak = habit.streak;
    if (!habitHistoryToday) {
        const habitHistoryYesterday = await HabitHistory.findOne({
            habitId,
            date: {
                $gte: startOfDay(new Date(Date.now() - 24 * 60 * 60 * 1000)),
                $lte: endOfDay(new Date(Date.now() - 24 * 60 * 60 * 1000)),
            },
        });

        if (!habitHistoryYesterday) {
            newStreak = 1;
        }

        newStreak = habit.streak + 1;
        return newStreak;
    }
    return;
};
