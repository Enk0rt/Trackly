import { DeleteResult, FilterQuery, SortOrder, UpdateResult } from "mongoose";

import { IUser, IUserQuery, IUserResponse } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(filter?: object): Promise<IUser[]> {
        return User.find(filter).populate({
            path: "userActivity",
            populate: { path: "plans" },
        });
    }

    public async getAllWithQuery(
        query: IUserQuery,
        currentUserId: string,
    ): Promise<IUserResponse> {
        const page = Number(query.page) > 0 ? Number(query.page) : 1;
        const pageSize =
            Number(query.pageSize) > 0 ? Number(query.pageSize) : 10;
        const skip = (page - 1) * pageSize;
        const {
            ids,
            role,
            isBlocked,
            isVerified,
            search,
            sort,
            sortDirection,
        } = query;

        const filteredObject: FilterQuery<IUser> = {
            _id: { $ne: currentUserId },
        };

        if (ids) {
            const idArray = Array.isArray(ids)
                ? ids
                : (ids as string).split(",").map((id) => id.trim());
            filteredObject._id = { $in: idArray, $ne: currentUserId };
        }

        if (role) {
            filteredObject.role = role;
        }

        if (isBlocked !== undefined) {
            filteredObject.isBlocked = isBlocked === "true";
        }

        if (isVerified !== undefined) {
            filteredObject.isVerified = isVerified === "true";
        }

        if (search) {
            const regex = new RegExp(`.*${search}.*`, "i");
            filteredObject.$or = [
                { name: { $regex: regex } },
                { surname: { $regex: regex } },
                { email: { $regex: regex } },
                { username: { $regex: regex } },
                { city: { $regex: regex } },
                { phoneNumber: { $regex: regex } },
            ];
        }

        const sortOrder: SortOrder =
            Number(sortDirection) === -1 || sortDirection === "desc" ? -1 : 1;

        const [data, total] = await Promise.all([
            User.find(filteredObject)
                .skip(skip)
                .limit(pageSize)
                .sort(sort ? { [sort]: sortOrder } : {}),
            User.countDocuments(filteredObject),
        ]);

        const totalPages = Math.ceil(total / pageSize);

        return {
            data,
            total,
            page,
            pageSize,
            totalPages,
        };
    }

    public getById(id: string): Promise<IUser> {
        return User.findById(id).populate({
            path: "userActivity",
            populate: { path: "plans" },
        });
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public getByUsername(username: string): Promise<IUser> {
        return User.findOne({ username });
    }

    public create(createData: Partial<IUser>): Promise<IUser> {
        return User.create(createData);
    }

    public update(id: string, updateData: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(id, updateData, { new: true });
    }

    public updateMany(
        ids: string[],
        updateData: Partial<IUser>,
    ): Promise<UpdateResult> {
        return User.updateMany({ _id: { $in: ids } }, updateData);
    }

    public delete(id: string): Promise<IUser> {
        return User.findByIdAndDelete(id);
    }

    public deleteMany(ids: string[]): Promise<DeleteResult> {
        return User.deleteMany({ _id: { $in: ids } });
    }
}

export const userRepository = new UserRepository();
