import { api } from "@/services/api/axiosInstanse";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";

export const getDataFromClient = {
    async getUsersWithParams(
        page?: number,
        pageSize?: number,
        search?: string,
        sort?: string,
        sortDirection?: "desc" | "asc" | 1 | -1,
        ids?: string[],
        role?: string,
        isBlocked?: string,
        isVerified?: string,
    ): Promise<IUsersResponseWithParams> {
        const { data } = await api.get<IUsersResponseWithParams>("/admin/users/params", {
            params: { page, pageSize, search, sort, sortDirection,  ...(ids && ids.length > 0 ? { ids: ids.join(',') } : {}), role, isBlocked, isVerified },
        });
        return data;
    },
};