import { useMutation } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useBlockOneUser = () => {

    return useMutation({
        mutationFn: (id: string) => adminService.blockOneUser(id),
        onSuccess: async () => {
           console.log("user is blocked")
        },
    });
};