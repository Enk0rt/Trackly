import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IHabit extends IBase {
    name: string;
    userId: ObjectId;
    description: string;
    deadline: Date;
    isChecked: boolean;
    isSettled: boolean;
}
