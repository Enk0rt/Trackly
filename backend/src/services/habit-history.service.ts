import { HabitHistoryTypeEnum } from "../enums/habit-history-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { increaseStreak } from "../helpers/update-streak";
import { IHabitHistory } from "../interfaces/habit-history.interface";
import { habitHistoryRepository } from "../repositories/habit-history.repository";
import { habitService } from "./habit.service";

class HabitHistory {
    public async getAll(): Promise<IHabitHistory[]> {
        return await habitHistoryRepository.getAll();
    }

    public async getById(id: string): Promise<IHabitHistory> {
        const habit = await habitHistoryRepository.getById(id);

        if (!habit) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "Habit history is not found",
            );
        }

        return habit;
    }

    public async create(
        createData: Partial<IHabitHistory>,
    ): Promise<IHabitHistory> {
        const { _habitId, type, date, note, isChecked, currentValue } =
            createData;
        switch (type) {
            case HabitHistoryTypeEnum.CHECK: {
                const newStreak = await increaseStreak(String(_habitId));
                const history = await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                    isChecked,
                });
                await habitService.update(String(_habitId), {
                    streak: newStreak,
                });
                return history;
            }

            case HabitHistoryTypeEnum.NOTE: {
                const newStreak = await increaseStreak(String(_habitId));
                const history = await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                    note,
                });
                await habitService.update(String(_habitId), {
                    streak: newStreak,
                });
                return history;
            }
            case HabitHistoryTypeEnum.PROGRESS: {
                const newStreak = await increaseStreak(String(_habitId));
                const history = await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                    note,
                    currentValue,
                    isChecked: true,
                });
                await habitService.update(String(_habitId), {
                    streak: newStreak,
                });
                return history;
            }
            case HabitHistoryTypeEnum.CREATED:
                return await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                });
            case HabitHistoryTypeEnum.UPDATED:
                return await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                });
        }
    }

    public async update(
        id: string,
        updateData: Partial<IHabitHistory>,
    ): Promise<IHabitHistory> {
        const habit = await habitHistoryRepository.update(id, updateData);

        if (!habit) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "Habit history is not found",
            );
        }

        return habit;
    }

    public async delete(id: string): Promise<void> {
        const habitHistory = await habitHistoryRepository.delete(id);

        if (!habitHistory) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "Habit history is not found",
            );
        }

        return;
    }
}

export const habitHistoryService = new HabitHistory();
