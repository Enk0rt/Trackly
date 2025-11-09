import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IHabit extends IBase {
    _id: ObjectId;
    _userId: ObjectId;
    title: string;
    description: string;
    time: string;
    deadline: Date;
    targetValue: number;
    targetUnit: string;
    category: string;
    frequency: string[];
    icon: string;
    streak: number;
    history: ObjectId[];
    reminders: boolean;
    isSettled: boolean;
}
