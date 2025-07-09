import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find().populate({
            path: "userActivity",
            populate: { path: "plans" },
        });
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

    public delete(id: string): Promise<IUser> {
        return User.findByIdAndDelete(id);
    }
}

export const userRepository = new UserRepository();
