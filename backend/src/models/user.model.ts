import { model, Schema } from "mongoose";

import { HeightMeasurementUnitEnum } from "../enums/height-measurement-unit.enum";
import { WeightMeasurementUnitEnum } from "../enums/weight-measurement-unit.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        name: { type: String, required: false },
        surname: { type: String, required: false },
        age: { type: Number, required: false },
        city: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        height: { type: Number, required: false },
        heightUnit: {
            type: String,
            enum: HeightMeasurementUnitEnum,
            required: false,
        },
        weight: { type: Number, required: false },
        targetWeight: { type: Number, required: false },
        weightUnit: {
            type: String,
            enum: WeightMeasurementUnitEnum,
            required: false,
        },
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
        goals: [{ type: Schema.Types.ObjectId, reg: "goal", required: false }],
        isDeleted: { type: Boolean, required: false },
        isVerified: { type: Boolean, required: false },
        isBlocked: { type: Boolean, required: false },
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
