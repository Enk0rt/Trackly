import { useQuery } from "@tanstack/react-query";
import { getDataFromClient } from "@/services/api/getDataFromClient";
import { IUser } from "@/interfaces/user/IUser";

export const useFetchUsers = (currentUsers: IUser[]) => {
    const { data: users, isPending, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getDataFromClient.getUsers,
        initialData: currentUsers,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    return { users, isPending, isLoading };
};