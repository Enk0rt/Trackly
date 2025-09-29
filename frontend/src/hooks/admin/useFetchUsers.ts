import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDataFromClient } from "@/services/api/getDataFromClient";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";

export const useFetchUsers = (
    page: number,
    pageSize: number,
    search: string,
    sort?: string,
    sortDirection?: "asc" | "desc" | 1 | -1,
    initialData?: IUsersResponseWithParams
) => {
    return useQuery<IUsersResponseWithParams>({
        queryKey: ["users", page, pageSize, search, sort, sortDirection],
        queryFn: () =>
            getDataFromClient.getUsersWithParams(page, pageSize, search, sort, sortDirection),

        initialData:initialData,

        initialDataUpdatedAt: initialData ? Date.now() : undefined,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 30_000,
    });
};