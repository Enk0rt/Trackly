import { IPlan } from "@/interfaces/IPlan";
import { IHabit } from "@/interfaces/IHabit";
import { IGoal } from "@/interfaces/IGoal";

export interface IUserActivity{
    _id: string;
    _userId: string;
    date: string;
    waterBalance: number;
    habits: IHabit[];
    goals: IGoal[];
    plans: IPlan[];
}