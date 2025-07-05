import { model, Schema } from "mongoose";

import { IBodyMeasure } from "../interfaces/body-measure.interface";

const bodyMeasureSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        value: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const BodyMeasure = model<IBodyMeasure>(
    "bodyMeasure",
    bodyMeasureSchema,
);
