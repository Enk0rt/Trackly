import { ObjectId } from "mongodb";

import { ImportanceEnum } from "../enums/importance.enum";
import { IBase } from "./base.interface";

export interface IMeeting extends IBase {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    time: Date;
    description: string;
    importance: ImportanceEnum;
    isDone: boolean;
}
