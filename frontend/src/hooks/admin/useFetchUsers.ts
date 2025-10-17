import { useCallback, useState } from "react";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { getDataFromClient } from "@/services/api/getDataFromClient";
import { AxiosError } from "axios";

export const useFetchUsers = (
    page: number,
    pageSize: number,
    search: string | undefined,
    sort: string | undefined,
    currentUsers: IUsersResponseWithParams,
) => {
    const [users, setUsers] = useState<IUsersResponseWithParams>(currentUsers);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const fetchUsers = useCallback(async() => {
        setIsLoading(true);
        setError(null);
        try {
            const users = await getDataFromClient.getUsersWithParams(
                page,
                pageSize,
                search,
                sort,
            );
            setIsLoading(false);
            setUsers(users);
            console.log("Action from fetchUsers")

        } catch (err) {
            setIsLoading(false);
            const e = err as AxiosError;
            setError(e);
            throw e;
        }
    }, [pageSize, search, sort, page]);

    return {
        users, setUsers,
        fetchUsers,
        isLoading,
        error,
    };
};