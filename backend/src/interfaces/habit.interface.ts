import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";
import { IHabitHistory } from "./habit-history.interface";

export interface IHabit extends IBase {
    _id: ObjectId;
    title: string;
    _userId: ObjectId;
    description: string;
    time: string;
    deadline: Date;
    targetValue: number;
    targetUnit: string;
    category: string;
    frequency: string[];
    icon: string;
    streak: number;
    history: IHabitHistory;
    reminders: boolean;
    isSettled: boolean;
}
