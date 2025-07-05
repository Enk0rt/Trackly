import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface IBodyMeasure extends IBase {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    value: number;
}
