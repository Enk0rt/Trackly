import { useMutation } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useUnblockOneUser = () => {

    return useMutation({
        mutationFn: (id: string) => adminService.unblockOneUser(id),
        onSuccess:async () => {
            console.log("user is unblock");
        },
    });
};