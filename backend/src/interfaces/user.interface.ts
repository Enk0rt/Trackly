import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";
import { IGoal } from "./goal.interface";
import { IGymParameters } from "./gym-parameters.interface";
import { ITodayActivity } from "./today-activity.interface";
import { ITokenPair } from "./tokens.interface";

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
    height: number;
    weight: number;
    targetWeight: number;
    targetWaterBalance: number;
    activityStreak: number;
    todayActivity: ITodayActivity;
    gymParameters: IGymParameters;
    goals: IGoal;
    isDeleted: boolean;
    isVerified: boolean;
    isBlocked: boolean;
}

export interface IUserWithTokens {
    user: IUser;
    tokens: ITokenPair;
}
