import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth";
import { IUser } from "@/interfaces/user/IUser";

export const useAuth = (currentUser?: IUser | null) => {
    return useQuery<IUser>({
        queryKey: ["user"],
        queryFn: getMe,
        gcTime: 0,
        initialData: currentUser ? currentUser: undefined,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};
