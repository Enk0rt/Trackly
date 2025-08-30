import { ISignUp } from "@/interfaces/auth/ISignUp";
import { IUserSignUp, IUserWithTokens } from "@/interfaces/user/IUser";
import { api } from "@/services/api/axiosInstanse";
import { ISignIn } from "@/interfaces/auth/ISignIn";


export const signUp = async <T> (signUpData: T): Promise<IUserSignUp> => {
    return await api.post<ISignUp, IUserSignUp>("/auth/sign-up", signUpData);
};


export const signIn = async (signInData: ISignIn): Promise<IUserWithTokens> => {
    const { user, tokens } = await api.post<ISignIn, IUserWithTokens>("/auth/sign-in", signInData);
    return { user, tokens };

};