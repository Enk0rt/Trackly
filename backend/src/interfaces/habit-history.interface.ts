import { ObjectId } from "mongodb";

import { HabitHistoryTypeEnum } from "../enums/habit-history-type.enum";

export interface IHabitHistoryEntry {
    _id: ObjectId;
    type: HabitHistoryTypeEnum;
    _habitId: ObjectId;
    isChecked?: boolean;
    note?: string;
    currentValue?: number;
    date: Date;
}
