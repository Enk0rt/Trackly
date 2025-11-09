import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { IHabitHistoryEntry } from "../interfaces/habit-history.interface";
import { HabitHistory } from "../models/habit-history.model";

dayjs.extend(isoWeek);

class HabitHistoryRepository {
    public getAll(): Promise<IHabitHistoryEntry[]> {
        return HabitHistory.find();
    }

    public getHabitHistoryEntryById(id: string): Promise<IHabitHistoryEntry> {
        return HabitHistory.findById(id);
    }

    public getHabitHistoryById(id: string): Promise<IHabitHistoryEntry[]> {
        return HabitHistory.find({ _habitId: id });
    }

    public getUserWeekEntries(_userId: string): Promise<IHabitHistoryEntry[]> {
        const startOfWeek = dayjs().startOf("isoWeek").toDate();
        const endOfWeek = dayjs().endOf("isoWeek").toDate();

        return HabitHistory.find({
            _userId,
            date: { $gte: startOfWeek, $lte: endOfWeek },
        });
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
