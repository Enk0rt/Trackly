import { IHabit } from "@/interfaces/habits/IHabit";
import { IGoal } from "@/interfaces/goals/IGoal";
import { IPlan } from "@/interfaces/plans/IPlan";

export interface IUserActivity{
    _id: string;
    _userId: string;
    date: string;
    waterBalance: number;
    habits: IHabit[];
    goals: IGoal[];
    plans: IPlan[];
}