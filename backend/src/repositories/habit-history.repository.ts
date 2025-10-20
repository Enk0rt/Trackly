import { IHabitHistory } from "../interfaces/habit-history.interface";
import { HabitHistory } from "../models/habit-history.model";

class HabitHistoryRepository {
    public getAll(): Promise<IHabitHistory[]> {
        return HabitHistory.find();
    }

    public getById(id: string): Promise<IHabitHistory> {
        return HabitHistory.findById(id);
    }

    public create(createData: Partial<IHabitHistory>): Promise<IHabitHistory> {
        return HabitHistory.create(createData);
    }

    public update(
        id: string,
        updateData: Partial<IHabitHistory>,
    ): Promise<IHabitHistory> {
        return HabitHistory.findByIdAndUpdate(id, updateData, {
            new: true,
        });
    }

    public delete(id: string): Promise<IHabitHistory> {
        return HabitHistory.findByIdAndDelete(id);
    }
}

export const habitHistoryRepository = new HabitHistoryRepository();
