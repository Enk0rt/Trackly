import { ISignUp } from "@/interfaces/auth/ISignUp";
import { IUser, IUserSignUp, IUserWithTokens } from "@/interfaces/user/IUser";
import { api } from "@/services/api/axiosInstanse";


export const signUp = async <T> (signUpData: T): Promise<IUserSignUp> => {
    return await api.post<ISignUp, IUserSignUp>("/auth/sign-up", signUpData);
};


export const signIn = async <T>(signInData: T): Promise<IUserWithTokens> => {
    const { data } = await api.post("/auth/sign-in", signInData);
    console.log('AXIOS RESPONSE:',data.data)
    return data.data
};

export const getMe = async ():Promise<IUser> => {
   const res = await api.get('/auth/me')
    console.log('USER - ',res)
    return res.data
}

export const logout = async ():Promise<void>=> {
    await api.post('/auth/logout')
}