import { IUser } from "@/interfaces/user/IUser";

export interface IUserResponse{
    data:IUser
}

export interface IUsersResponse{
    data:IUser[]
}

export interface IUsersResponseWithParams{
    data: IUser[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}