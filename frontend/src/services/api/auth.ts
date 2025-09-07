import { ISignUp } from "@/interfaces/auth/ISignUp";
import { IUser, IUserSignUp, IUserWithTokens } from "@/interfaces/user/IUser";
import { api } from "@/services/api/axiosInstanse";
import { IToken } from "@/interfaces/auth/IToken";


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
        const res = await api.get("/auth/me");
        return res.data

    } catch (err: any) {
        if (err.response?.status === 401) {
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