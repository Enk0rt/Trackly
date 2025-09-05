import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth";

export const useAuth = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
    });
};
