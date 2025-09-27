import { IUserActivity } from "@/interfaces/user/IUserActivity";
import { IGoal } from "@/interfaces/goals/IGoal";
import { IHabit } from "@/interfaces/habits/IHabit";
import { IPlan } from "@/interfaces/plans/IPlan";
import { IToken } from "@/interfaces/auth/IToken";
import { IAchievement } from "@/interfaces/achievements/IAchievement";


export interface IUser {
    _id: string;
    username: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    city: string;
    password: string;
    phoneNumber: string;
    avatar: string;
    targetWaterBalance: number;
    activityStreak: number;
    userActivity: IUserActivity[];
    goals: IGoal[];
    habits: IHabit[];
    plans: IPlan[];
    achievements: IAchievement[];
    role: string;
    isDeleted: boolean;
    isVerified: boolean;
    isBlocked: boolean;
}

export type IUserSignUp = Pick<IUser, "_id" | "username" | "name" | "surname" | "email">

export type IUserWithTokens = {
    user: IUser
    tokens: IToken
}