import { IHabitHistoryEntry } from "../interfaces/habit-history.interface";
import { HabitHistory } from "../models/habit-history.model";

class HabitHistoryRepository {
    public getAll(): Promise<IHabitHistoryEntry[]> {
        return HabitHistory.find();
    }

    public getById(id: string): Promise<IHabitHistoryEntry> {
        return HabitHistory.findById(id);
    }

    public create(
        createData: Partial<IHabitHistoryEntry>,
    ): Promise<IHabitHistoryEntry> {
        return HabitHistory.create(createData);
    }

    public update(
        id: string,
        updateData: Partial<IHabitHistoryEntry>,
    ): Promise<IHabitHistoryEntry> {
        return HabitHistory.findByIdAndUpdate(id, updateData, {
            new: true,
        });
    }

    public delete(id: string): Promise<IHabitHistoryEntry> {
        return HabitHistory.findByIdAndDelete(id);
    }
}

export const habitHistoryRepository = new HabitHistoryRepository();
