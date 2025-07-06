import { model, Schema } from "mongoose";

import { ITokens } from "../interfaces/tokens.interface";

const tokenSchema = new Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    },
    { timestamps: true, versionKey: false },
);

export const Token = model<ITokens>("tokens", tokenSchema);
