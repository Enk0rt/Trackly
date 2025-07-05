import { IBase } from "./base.interface";
import { IGoal } from "./goal.interface";
import { IGymParameters } from "./gym-parameters.interface";
import { ITodayActivity } from "./today-activity.interface";

export interface IUser extends IBase {
    username: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    phoneNumber: number;
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
