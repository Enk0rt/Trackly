import { Dispatch, SetStateAction } from "react";
import { logout } from "@/services/api/auth";

export const handleLogout = async (setState:Dispatch<SetStateAction<boolean>>) => {
    await logout()
    setState(false)
}