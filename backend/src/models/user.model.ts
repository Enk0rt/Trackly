import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        name: {
            type: String,
            required: false,
            default: null,
        },
        surname: { type: String, required: false, default: null },
        age: { type: Number, required: false },
        city: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        avatar: { type: String, required: false, default: null },
        targetWaterBalance: { type: Number, required: false },
        activityStreak: { type: Number, required: false },
        userActivity: {
            type: Schema.Types.ObjectId,
            ref: "todayActivity",
            required: false,
        },
        habits: [
            { type: Schema.Types.ObjectId, ref: "habit", required: false },
        ],
        plans: [{ type: Schema.Types.ObjectId, ref: "plans", required: false }],
        goals: [{ type: Schema.Types.ObjectId, ref: "goal", required: false }],
        achievements: [
            {
                type: Schema.Types.ObjectId,
                ref: "achievement",
                required: false,
            },
        ],
        role: { type: String, required: false, default: RoleEnum.USER },
        isDeleted: { type: Boolean, required: false, default: false },
        isVerified: { type: Boolean, required: false, default: false },
        isBlocked: { type: Boolean, required: false, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    },
);

export const User = model<IUser>("user", userSchema);
