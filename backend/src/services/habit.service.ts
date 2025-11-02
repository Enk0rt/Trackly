import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IHabit } from "../interfaces/habit.interface";
import { User } from "../models/user.model";
import { habitRepository } from "../repositories/habit.repository";

class HabitService {
    public async getAll(): Promise<IHabit[]> {
        return await habitRepository.getAll();
    }
    public async getUserHabits(userId: string): Promise<IHabit[]> {
        return await habitRepository.getUserHabits(userId);
    }

    public async getById(id: string): Promise<IHabit> {
        const habit = await habitRepository.getById(id);

        if (!habit) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Habit is not found");
        }

        return habit;
    }

    public async create(createData: Partial<IHabit>): Promise<IHabit> {
        const habit = await habitRepository.create({
            ...createData,
            category: createData.category.toLowerCase(),
        });

        const user = await User.findById(String(createData._userId));
        user.habits.push(habit._id);
        user.save();

        return habit;
    }

    public async update(
        id: string,
        updateData: Partial<IHabit>,
    ): Promise<IHabit> {
        const habit = await habitRepository.update(id, updateData);

        if (!habit) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Habit is not found");
        }

        return habit;
    }

    public async delete(id: string): Promise<void> {
        const habit = await habitRepository.delete(id);

        if (!habit) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "Habit is not found");
        }

        const user = await User.findById(String(habit._userId));

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        user.habits = user.habits.filter(
            (habitId) => !habitId.equals(habit._id),
        );

        await user.save();

        return;
    }
}

export const habitService = new HabitService();
