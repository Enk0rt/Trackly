import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userService } from "./user.service";

export class AdminService {
    public async getUsers(): Promise<IUser[]> {
        return await userService.getAll({ role: "user" });
    }

    public async blockUser(id: string): Promise<IUser> {
        const user = await userService.update(id, { isBlocked: true });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async unblockUser(id: string): Promise<IUser> {
        const user = await userService.update(id, { isBlocked: false });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async deleteUser(id: string): Promise<IUser> {
        const user = await userService.delete(id);

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async changeRole(id: string, role: string): Promise<IUser> {
        const user = await userService.update(id, { role });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }
}

export const adminService = new AdminService();
