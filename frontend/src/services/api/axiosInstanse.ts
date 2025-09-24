import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { refresh } from "@/services/api/auth";
import { getCookie } from "cookies-next";

export const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export const setupInterceptors = (queryClient: QueryClient) => {
    api.interceptors.response.use(
        (res) => res,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                const refreshToken = getCookie("refreshToken");
                if (!refreshToken) {
                    queryClient.setQueryData(["user"], null);
                    return Promise.reject(error);
                }

                if (originalRequest.url?.includes("/auth/refresh")) {
                    queryClient.setQueryData(["user"], null);
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                try {
                    await refresh();
                    return api.request(originalRequest);
                } catch (err) {
                    queryClient.setQueryData(["user"], null);
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        },
    );
};