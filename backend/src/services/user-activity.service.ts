import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IUserActivity } from "../interfaces/user-activity.interface";
import { userActivityRepository } from "../repositories/user-activity.repository";

class UserActivityService {
    public async getAll(): Promise<IUserActivity[]> {
        const userActivities = await userActivityRepository.getAll();
        if (!userActivities) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "User activity is not found",
            );
        }
        return userActivities;
    }

    public async getById(id: string): Promise<IUserActivity> {
        const userActivity = await userActivityRepository.getById(id);
        if (!userActivity) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "User activity is not found",
            );
        }
        return userActivity;
    }

    public async delete(id: string): Promise<IUserActivity> {
        const userActivity = await userActivityRepository.delete(id);
        if (!userActivity) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "User activity is not found",
            );
        }
        return await userActivityRepository.delete(id);
    }
}

export const userActivityService = new UserActivityService();
