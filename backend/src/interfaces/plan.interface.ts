import { ObjectId } from "mongodb";

import { ImportanceEnum } from "../enums/importance.enum";

export interface IPlan {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    time: Date;
    importance: ImportanceEnum;
    isDone: boolean;
}
