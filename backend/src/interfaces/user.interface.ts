import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";
import { IGymParameters } from "./gym-parameters.interface";
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
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    targetWeight: number;
    targetWaterBalance: number;
    activityStreak: number;
    userActivity: IUserActivity;
    gymParameters: IGymParameters;
    goals: ObjectId[];
    habits: ObjectId[];
    isDeleted: boolean;
    isVerified: boolean;
    isBlocked: boolean;
}

export interface IUserWithTokens {
    user: IUser;
    tokens: ITokenPair;
}
