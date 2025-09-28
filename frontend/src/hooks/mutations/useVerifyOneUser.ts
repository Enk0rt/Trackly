import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useVerifyOneUser = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => adminService.verifyOneUser(id),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["users"] });
        },
    });
};