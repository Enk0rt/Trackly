import { ISignUp } from "@/interfaces/auth/ISignUp";
import { IUser, IUserSignUp, IUserWithTokens } from "@/interfaces/user/IUser";
import { api } from "@/services/api/axiosInstanse";
import { IUserResponse } from "@/interfaces/user/IUserResponse";


export const signUp = async <T>(signUpData: T): Promise<IUserSignUp> => {
    return await api.post<ISignUp, IUserSignUp>("/auth/sign-up", signUpData);
};


export const signIn = async <T>(signInData: T): Promise<IUserWithTokens> => {
    const { data } = await api.post("/auth/sign-in", signInData);
    console.log("AXIOS RESPONSE:", data.data);
    return data.data;
};

export const getMe = async (): Promise<IUser> => {
    const { data } = await api.get<IUserResponse>("/auth/me");
    return data.data;
};

export const refresh = async (): Promise<void> => {
    await api.get("/auth/refresh");
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

export const verifyEmail = async (token: string): Promise<IUser | null> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://nginx/api";
        const res = await fetch(`${baseUrl}/auth/verify/confirm/${token}`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }
        const data: IUserResponse = await res.json();
        return data.data;
    } catch (e) {
        console.error("Failed to verify email:", e);
        return null;
    }
};

export const sendRecoveryRequest = async (email: string): Promise<void> => {
    await api.post("/auth/recovery/password", { email });
};

export const verifyPasswordRecoveryToken = async (token: string): Promise<boolean> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://nginx/api";
        const res = await fetch(`${baseUrl}/auth/recovery/confirm/${token}`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        return res.ok;
    } catch (e) {
        console.error("Failed to verify token:", e);
        return false;
    }
};
export const changePasswordFromEmail = async (
    payload: { token: string; password: string }
): Promise<IUser> => {
    const { token, password } = payload;
    const { data } = await api.patch<IUserResponse>(
        `/auth/recovery/confirm/${token}`,
        { newPass: password }
    );
    return data.data;
};