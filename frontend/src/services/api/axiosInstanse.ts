import axios, { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";
import { refresh } from "@/services/api/auth";

export const api = axios.create({
    baseURL: "/api" ,
    withCredentials: true,
});

declare module "axios" {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

export const setupInterceptors = (queryClient: QueryClient) => {
    api.interceptors.response.use(
        (res) => res,
        async (error: AxiosError) => {
            const originalRequest = error.config;

            const isAuthRoute =
                originalRequest?.url?.includes("/auth/sign-in") ||
                originalRequest?.url?.includes("/auth/sign-up");

            if (
                error.response?.status === 401 &&
                originalRequest &&
                !originalRequest._retry &&
                !isAuthRoute
            ) {
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
        }
    );
};
