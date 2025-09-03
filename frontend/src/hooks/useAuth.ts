import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth";

export const useAuth = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        select: (data) => data ?? null,
    });
};
