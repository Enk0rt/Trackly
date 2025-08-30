import { api } from "@/services/api/axiosInstanse";
import { retrieveLocalStorage } from "@/services/api/helpers/retrieveLocalStorage";
import {IUserWithTokens } from "@/interfaces/user/IUser";

api.interceptors.request.use(req => {
        if (req.method?.toUpperCase() === "GET") {
            req.headers.Authorization = "Bearer" + retrieveLocalStorage<IUserWithTokens>("user").tokens.accessToken;
        }
    return req;
})