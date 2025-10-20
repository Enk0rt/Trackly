import { HabitHistoryTypeEnum } from "../enums/habit-history-type.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { increaseStreak } from "../helpers/update-streak";
import { IHabitHistoryEntry } from "../interfaces/habit-history.interface";
import { Habit } from "../models/habit.model";
import { habitHistoryRepository } from "../repositories/habit-history.repository";

class HabitHistory {
    public async getAll(): Promise<IHabitHistoryEntry[]> {
        return await habitHistoryRepository.getAll();
    }

    public async getById(id: string): Promise<IHabitHistoryEntry> {
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
        createData: Partial<IHabitHistoryEntry>,
    ): Promise<IHabitHistoryEntry> {
        const { _habitId, type, date, note, currentValue } = createData;
        const habit = await Habit.findById(String(_habitId));

        if (!habit) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Habit not found");
        }

        let newStreak: number;

        let historyEntry: IHabitHistoryEntry;
        switch (type) {
            case HabitHistoryTypeEnum.CHECK:
            case HabitHistoryTypeEnum.NOTE:
            case HabitHistoryTypeEnum.PROGRESS:
                newStreak = await increaseStreak(String(_habitId));
                historyEntry = await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                    note,
                    currentValue,
                    isChecked: true,
                });
                habit.streak = newStreak;
                habit.history.push(historyEntry._id);

                await habit.save();
                break;

            case HabitHistoryTypeEnum.CREATED:
            case HabitHistoryTypeEnum.UPDATED:
                historyEntry = await habitHistoryRepository.create({
                    _habitId,
                    type,
                    date,
                });
                break;
        }

        return historyEntry;
    }

    public async update(
        id: string,
        updateData: Partial<IHabitHistoryEntry>,
    ): Promise<IHabitHistoryEntry> {
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

        const habit = await Habit.findById(String(habitHistory._habitId));

        if (!habit) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Habit is not found");
        }

        habit.history = habit.history.filter(
            (habitId) => !habitId.equals(habitHistory._id),
        );

        habit.save();
        return;
    }
}

export const habitHistoryService = new HabitHistory();
