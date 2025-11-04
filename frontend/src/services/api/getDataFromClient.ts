import { api } from "@/services/api/axiosInstanse";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { IHabitHistory, IHabitHistoryResponse } from "@/interfaces/habits/IHabitHistory";
import { IHabit, IHabitResponse } from "@/interfaces/habits/IHabit";
import { IHabitChecks, IHabitChecksResponse } from "@/interfaces/habits/IHabitChecks";

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
            params: {
                page,
                pageSize,
                search,
                sort,
                sortDirection, ...(ids && ids.length > 0 ? { ids: ids.join(",") } : {}),
                role,
                isBlocked,
                isVerified,
            },
        });
        return data;
    },

    async getMyHabits(): Promise<IHabit[]> {
        const { data } = await api.get<IHabitResponse>("/auth/habits");
        return data.data;
    },

    async getMyHabitsChecks(): Promise<IHabitChecks[]> {
        const { data } = await api.get<IHabitChecksResponse>("/habit/history/checks");
        return data.data;
    },

    async getHabitHistory(id: string): Promise<IHabitHistory[]> {
        const { data } = await api.get<IHabitHistoryResponse>(`/habit/history/${id}`);
        return data.data;
    },
};