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
            getDataFromClient.getUsersWithParams(page, pageSize, search?.trim() || undefined, sort, sortDirection),

        initialData: page === 1 && !search?.trim() ? initialData : undefined,
        initialDataUpdatedAt: initialData ? Date.now() : undefined,

        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 0,
    });
};