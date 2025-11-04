import { IHabitHistory } from "@/interfaces/habits/IHabitHistory";
import { IChecks } from "@/interfaces/habits/IHabitChecks";

export interface IHabit {
    _id: string,
    title: string;
    _userId: string;
    description: string;
    deadline: Date;
    time: string,
    targetUnit: string,
    category: string,
    frequency: string[],
    icon: string | null,
    reminders: boolean,
    history: IHabitHistory[],
    streak: number,
    isChecked: boolean;
    isSettled: boolean;
}

export interface IHabitResponse {
    data: IHabit[];
    details: string;
}

export interface IHabitWithChecks extends IHabit{
   habitChecks:IChecks[]
}