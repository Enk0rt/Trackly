import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useBlockOneUser = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => adminService.blockOneUser(id),
        onSuccess: async () => {
           await client.invalidateQueries({ queryKey: ["users"]});
        },
    });
};