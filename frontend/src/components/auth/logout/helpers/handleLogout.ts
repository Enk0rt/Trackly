import { QueryClient } from "@tanstack/react-query";
import { logout } from "@/services/api/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleLogout = async (queryClient: QueryClient, pathname: string, router: AppRouterInstance) => {
    await logout();
    queryClient.setQueryData(["user"], null);
    if (!pathname.startsWith("/sign-in") || !pathname.startsWith("/sign-up") || !pathname.startsWith("/")) {
        router.push("/");
    }
};