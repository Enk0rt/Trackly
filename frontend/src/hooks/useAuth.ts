import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth";
import { IUser } from "@/interfaces/user/IUser";

export const useAuth = () => {
    return useQuery<IUser>({
        queryKey: ["user"],
        queryFn: getMe,
        gcTime: 0,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};
