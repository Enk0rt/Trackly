import { IUserActivity } from "../interfaces/user-activity.interface";
import { UserActivity } from "../models/user-activity.model";

class UserActivityRepository {
    public getAll(): Promise<IUserActivity[]> {
        return UserActivity.find().populate("plans");
    }

    public getById(id: string): Promise<IUserActivity> {
        return UserActivity.findById(id).populate("plans");
    }

    public create(createData: Partial<IUserActivity>): Promise<IUserActivity> {
        return UserActivity.create(createData);
    }

    public update(
        id: string,
        updateData: Partial<IUserActivity>,
    ): Promise<IUserActivity> {
        return UserActivity.findByIdAndUpdate(id, updateData, { new: true });
    }

    public delete(id: string): Promise<IUserActivity> {
        return UserActivity.findByIdAndDelete(id);
    }
}

export const userActivityRepository = new UserActivityRepository();
