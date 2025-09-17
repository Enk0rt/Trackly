import { IUserResponse } from "@/interfaces/user/IUserResponse";
import { IUser } from "@/interfaces/user/IUser";

export const getData = {
    async getUserByUsername(username: string): Promise<IUser | null> {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://nginx/api';

            const res = await fetch(`${baseUrl}/users/username/${username}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store"
            });

            if (!res.ok) {
                console.error("API returned", res.status);
                return null;
            }

            const data: IUserResponse = await res.json();
            return data.data;
        } catch (e) {
            console.error("Failed to fetch user:", e);
            return null;
        }
    },
};