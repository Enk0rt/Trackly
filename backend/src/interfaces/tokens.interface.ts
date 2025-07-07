import { ObjectId } from "mongodb";

import { IBase } from "./base.interface";

export interface ITokens extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: ObjectId;
}

export type ITokenPayload = {
    _userId: ObjectId;
    username: string;
};

export type ITokenPair = {
    accessToken: string;
    refreshToken: string;
};

export type TokenModel = Pick<
    ITokens,
    "accessToken" | "refreshToken" | "_userId"
>;
