import { ObjectId } from "mongodb";

import { HabitHistoryTypeEnum } from "../enums/habit-history-type.enum";

export interface IHabitHistoryEntry {
    _id: ObjectId;
    type: HabitHistoryTypeEnum;
    _habitId: ObjectId;
    _userId: ObjectId;
    isChecked?: boolean;
    note?: string;
    currentValue?: number;
    date: Date;
}

export interface IHabitChecks {
    _habitId: string;
    week: IChecks[];
}

interface IChecks {
    day: string;
    date: Date;
    isChecked: boolean;
}
