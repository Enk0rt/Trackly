
import { api } from "@/services/api/axiosInstanse";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";

export const getDataFromClient = {
    async getUsersWithParams(
        page?: number,
        pageSize?: number,
        search?: string,
        sort?: string,
        sortDirection?: "desc" | "asc" | 1 | -1
    ): Promise<IUsersResponseWithParams> {
        const { data } = await api.get<IUsersResponseWithParams>("/admin/users/params", {
            params: { page, pageSize, search, sort, sortDirection },
        });
        return data;
    },
};