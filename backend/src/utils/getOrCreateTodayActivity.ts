import dayjs from "dayjs";
import { ObjectId } from "mongodb";

import { User } from "../models/user.model";
import { UserActivity } from "../models/user-activity.model";

export const getOrCreateUserActivity = async (_userId: ObjectId) => {
    const today = dayjs().format("YYYY-MM-DD");

    let userActivity = await UserActivity.findOne({ _userId, date: today });
    if (!userActivity) {
        userActivity = await UserActivity.create({
            _userId: _userId,
            date: today,
        });

        await User.findByIdAndUpdate(_userId, {
            userActivity: userActivity._id,
        });
    }

    return userActivity;
};
