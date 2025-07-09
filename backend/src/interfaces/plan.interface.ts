import { ObjectId } from "mongodb";

import { ImportanceEnum } from "../enums/importance.enum";

export interface IPlan {
    _id: ObjectId;
    _userId: ObjectId;
    name: string;
    time: string;
    importance: ImportanceEnum;
    isDone: boolean;
}
