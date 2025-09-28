import { IUser } from "@/interfaces/user/IUser";
import { api } from "@/services/api/axiosInstanse";

export const getDataFromClient ={
    async getUsers():Promise<IUser[]>{
        const {data} = await api.get('/admin')
        return data.data
    }
}