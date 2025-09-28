import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useVerifyManyUsers = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => adminService.verifyManyUsers(ids),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
