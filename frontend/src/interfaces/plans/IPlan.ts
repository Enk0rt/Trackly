import { IHabit } from "@/interfaces/habits/IHabit";

export interface IPlan{
    _id: string;
    _userId: string;
    name: string;
    type: string;
    description: string;
    linkedHabits: IHabit[];
    date: string;
    startTime: string;
    finishTime: string;
    repeat: boolean;
    isDone: boolean;
}