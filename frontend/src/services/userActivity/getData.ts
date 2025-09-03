import { api } from "@/services/api/axiosInstanse";

export const getData = async <T>(): Promise<T> => {
    const response =  await api.get<T>("/activity");
    return response.data
};