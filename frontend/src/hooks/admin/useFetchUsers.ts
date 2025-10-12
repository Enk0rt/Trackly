import { getDataFromClient } from "@/services/api/getDataFromClient";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { Dispatch, SetStateAction, useCallback } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useFetchUsers = (page: number, pageSize: number, searchValue: string, sortValue: string | undefined, setUsers: Dispatch<SetStateAction<IUsersResponseWithParams>>) => {

    const router = useRouter();

    const fetchUsers = useCallback(async () => {
        try {
            const users = await getDataFromClient.getUsersWithParams(page, pageSize, searchValue, sortValue);
            setUsers(users);
        } catch (err) {
            const error = err as AxiosError;
            console.error("Failed to fetch users:", err);
            if (error.status === 401) {
                router.push("/");
            }
        }
    }, [page, pageSize, router, searchValue, setUsers, sortValue]);

    return { fetchUsers };
}; 
    