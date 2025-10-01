import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useUnblockManyUsers = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => adminService.unblockManyUsers(ids),
        onSuccess: async () => {
          await  client.invalidateQueries({ queryKey: ["users"]});
        },
    });
};
