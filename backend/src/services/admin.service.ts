import { DeleteResult, UpdateResult } from "mongoose";

import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserQuery, IUserResponse } from "../interfaces/user.interface";
import { emailService } from "./email.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

export class AdminService {
    public async getUsersWithQuery(query: IUserQuery): Promise<IUserResponse> {
        return await userService.getAllWithQuery(query);
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

    public async verifyOneUser(id: string): Promise<IUser> {
        const user = await userService.updateOne(id, { isVerified: true });

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        return user;
    }

    public async verifyManyUsers(
        ids: string[],
    ): Promise<[IUser[], UpdateResult]> {
        const result = await userService.updateMany(ids, { isVerified: true });
        const users = await userService.getAll({ _id: { $in: ids } });
        if (!result) {
            throw new ApiError(
                StatusCodeEnum.NOT_FOUND,
                "Can not update users",
            );
        }

        return [users, result];
    }

    public async sendVerifyRequest(id: string): Promise<void> {
        const user = await userService.getById(id);

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }

        const verifyToken = tokenService.generateActionToken(
            {
                _userId: user._id,
                username: user.username,
                role: user.role,
            },
            ActionTokenTypeEnum.VERIFY,
        );

        await emailService.sendMail(
            user.email,
            emailConstants[EmailEnum.VERIFY],
            {
                name: user.name,
                username: user.username,
                url: `${config.FRONTEND_URL}/verify/${verifyToken}`,
            },
        );

        return;
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
