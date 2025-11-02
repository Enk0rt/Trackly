import { IHabit } from "../interfaces/habit.interface";
import { Habit } from "../models/habit.model";

class HabitRepository {
    public getAll(): Promise<IHabit[]> {
        return Habit.find();
    }

    public getUserHabits(userId: string): Promise<IHabit[]> {
        return Habit.find({ _userId: userId });
    }

    public getById(id: string): Promise<IHabit> {
        return Habit.findById(id);
    }

    public create(createData: Partial<IHabit>): Promise<IHabit> {
        return Habit.create(createData);
    }

    public update(id: string, updateData: Partial<IHabit>): Promise<IHabit> {
        return Habit.findByIdAndUpdate(id, updateData, {
            new: true,
        });
    }

    public delete(id: string): Promise<IHabit> {
        return Habit.findByIdAndDelete(id);
    }
}

export const habitRepository = new HabitRepository();
