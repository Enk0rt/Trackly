import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useBlockManyUsers = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => adminService.blockManyUsers(ids),
        onSuccess: async () => {
           await client.invalidateQueries({ queryKey: ["users"]});
        },
    });
};
