import { ISignUp } from "@/interfaces/auth/ISignUp";
import { IUser, IUserSignUp, IUserWithTokens } from "@/interfaces/user/IUser";
import { api } from "@/services/api/axiosInstanse";
import { IUserResponse } from "@/interfaces/user/IUserResponse";
import { AxiosError } from "axios";


export const signUp = async <T>(signUpData: T): Promise<IUserSignUp> => {
    return await api.post<ISignUp, IUserSignUp>("/auth/sign-up", signUpData);
};


export const signIn = async <T>(signInData: T): Promise<IUserWithTokens> => {
    const { data } = await api.post("/auth/sign-in", signInData);
    console.log("AXIOS RESPONSE:", data.data);
    return data.data;
};

export const getMe = async (): Promise<IUser> => {
    try {
        const { data } = await api.get<IUserResponse>("/auth/me");
        return data.data;

    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response?.status === 401) {
            await refresh();
            return await getMe();
        }
        throw err;
    }
};

export const refresh = async (): Promise<void> => {
    await api.get("/auth/refresh");
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};