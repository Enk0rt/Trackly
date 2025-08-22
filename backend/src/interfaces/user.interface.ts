import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";
import { ITokenPair } from "./tokens.interface";
import { IUserActivity } from "./user-activity.interface";

export interface IUser extends IBase {
    _id: ObjectId;
    username: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    city: string;
    password: string;
    phoneNumber: string;
    targetWaterBalance: number;
    activityStreak: number;
    userActivity: IUserActivity;
    goals: ObjectId[];
    habits: ObjectId[];
    plans: ObjectId[];
    isDeleted: boolean;
    isVerified: boolean;
    isBlocked: boolean;
}

export interface IUserWithTokens {
    user: IUser;
    tokens: ITokenPair;
}
