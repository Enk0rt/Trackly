import { IUserResponse, IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { IUser } from "@/interfaces/user/IUser";
import { apiFetch } from "@/services/api/lib/apiFetch";
import { IHabit, IHabitResponse } from "@/interfaces/habits/IHabit";
import { IHabitChecks, IHabitChecksResponse } from "@/interfaces/habits/IHabitChecks";

export const getDataFromServer = {
    async getUserByUsername(username: string): Promise<IUser | null> {
        try {

            const res = await apiFetch(`/users/username/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
            });

            if (!res.ok) return null;

            const data: IUserResponse = await res.json();
            return data.data;
        } catch (e) {
            console.error("Failed to fetch user:", e);
            return null;
        }
    },

    async getMe(): Promise<IUser | null> {
        try {
            const res = await apiFetch(`/auth/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data: IUserResponse = await res.json();
            return data.data;
        } catch (e) {
            console.error("Failed to fetch user:", e);
            return null;
        }
    },

    async getUsersWithParams(page?: number, pageSize?: number, search?: string, sort?: string, sortDirection?: "desc" | "asc" | 1 | -1): Promise<IUsersResponseWithParams> {
        const params = new URLSearchParams();

        if (page !== undefined) params.append("page", page.toString());
        if (pageSize !== undefined) params.append("pageSize", pageSize.toString());
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        if (sortDirection) params.append("sortDirection", sortDirection.toString());

        const res = await apiFetch(
            `/admin/users/params?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        return await res.json();
    },

    async getUserHabits(id: string): Promise<IHabit | null> {
        try {
            const res = await apiFetch(`/habits/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await res.json();
        } catch (e) {
            console.error("Failed to fetch user:", e);
            return null;
        }
    },

    async getMyHabits(): Promise<IHabit[] | null> {
        try {
            const res = await apiFetch(`/auth/habits`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data: IHabitResponse = await res.json();
            return data.data;
        } catch (e) {
            console.error("Failed to fetch user:", e);
            return null;
        }
    },

    async getMyHabitChecks(): Promise<IHabitChecks[] | null> {
        try {
            const res = await apiFetch(`/habit/history/checks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data: IHabitChecksResponse = await res.json();
            return data.data;
        } catch (e) {
            console.error("Failed to fetch user:", e);
            return null;
        }
    },
};
