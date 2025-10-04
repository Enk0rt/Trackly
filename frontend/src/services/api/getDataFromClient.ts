
import { api } from "@/services/api/axiosInstanse";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";

export const getDataFromClient ={
    async getUsersWithParams(page?: number, pageSize?: number, search?: string, sort?: string, sortDirection?: "desc" | "asc" | 1 | -1): Promise<IUsersResponseWithParams> {
        const params = new URLSearchParams();

        if (page !== undefined) params.append("page", page.toString());
        if (pageSize !== undefined) params.append("pageSize", pageSize.toString());
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        if (sortDirection) params.append("sortDirection", sortDirection.toString());

        const { data } = await api.get<IUsersResponseWithParams>(
            `/admin/users/params?${params.toString()}`
        );
        return data;
    },
}