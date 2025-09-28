import { DeleteResult, UpdateResult } from "mongoose";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userService } from "./user.service";

export class AdminService {
    public async getUsers(): Promise<IUser[]> {
        return await userService.getAll({ role: "user" });
    }

    public async blockOneUser(id: string): Promise<IUser> {
        const user = await userService.updateOne(id, { isBlocked: true });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async blockManyUsers(
        ids: string[],
    ): Promise<[IUser[], UpdateResult]> {
        const result = await userService.updateMany(ids, { isBlocked: true });
        const users = await userService.getAll({ _id: { $in: ids } });
        if (!result) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Can not update users",
            );
        }

        return [users, result];
    }

    public async unblockOneUser(id: string): Promise<IUser> {
        const user = await userService.updateOne(id, { isBlocked: false });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async unblockManyUsers(
        ids: string[],
    ): Promise<[IUser[], UpdateResult]> {
        const result = await userService.updateMany(ids, { isBlocked: false });
        const users = await userService.getAll({ _id: { $in: ids } });
        if (!result) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "Can not update users",
            );
        }

        return [users, result];
    }

    public async deleteOneUser(id: string): Promise<IUser> {
        const user = await userService.delete(id);

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async deleteManyUsers(ids: string[]): Promise<DeleteResult> {
        const res = await userService.deleteMany(ids);

        if (!res) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Can not delete users",
            );
        }

        return res;
    }

    public async changeRole(id: string, role: string): Promise<IUser> {
        const user = await userService.updateOne(id, { role });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }
}

export const adminService = new AdminService();
