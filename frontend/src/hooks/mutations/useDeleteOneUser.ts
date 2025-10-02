import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useDeleteUser = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => adminService.deleteOneUser(id),
        onSuccess: async () => {
           await client.invalidateQueries({ queryKey: ["users"]});
        },
    });
};