import { IUserResponse, IUsersResponse } from "@/interfaces/user/IUserResponse";
import { IUser } from "@/interfaces/user/IUser";
import { apiFetch } from "@/services/api/lib/apiFetch";

export const getData = {
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

    async getUsers(): Promise<IUser[] | null> {
        try {

            const res = await apiFetch(`/admin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) return null;

            const data: IUsersResponse = await res.json();
            return data.data;
        } catch (e) {
            console.error("Failed to fetch users:", e);
            return null;
        }
    },
};