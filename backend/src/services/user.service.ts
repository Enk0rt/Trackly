import { DeleteResult } from "mongoose";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(filter?: object): Promise<IUser[]> {
        return await userRepository.getAll(filter);
    }

    public async getById(id: string): Promise<IUser> {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }
        return user;
    }

    public async getByEmail(email: string): Promise<IUser> {
        return await userRepository.getByEmail(email);
    }

    public async getByUsername(username: string): Promise<IUser> {
        return await userRepository.getByUsername(username);
    }

    public async create(createData: Partial<IUser>): Promise<IUser> {
        return await userRepository.create(createData);
    }

    public async update(
        id: string,
        updateData: Partial<IUser>,
    ): Promise<IUser> {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }
        return await userRepository.update(id, updateData);
    }

    public async delete(id: string): Promise<IUser> {
        const user = await userRepository.delete(id);
        if (!user) {
            throw new ApiError(StatusCodeEnum.NOT_FOUND, "User is not found");
        }
        return user;
    }

    public async deleteMany(ids: string[]): Promise<DeleteResult> {
        const res = await userRepository.deleteMany(ids);
        if (!res) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "Can not delete users",
            );
        }
        return res;
    }

    public async isUserUnique(
        email: string,
        username: string,
    ): Promise<boolean> {
        const [userByEmail, userByUsername] = await Promise.all([
            userService.getByEmail(email),
            userService.getByUsername(username),
        ]);

        if (userByEmail) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "User with this email already exists",
                "email",
            );
        }

        if (userByUsername) {
            throw new ApiError(
                StatusCodeEnum.BAD_REQUEST,
                "User with this username already exists",
                "username",
            );
        }
        return;
    }
}

export const userService = new UserService();
