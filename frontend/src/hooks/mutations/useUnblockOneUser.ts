import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useUnblockOneUser = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => adminService.unblockOneUser(id),
        onSuccess:async () => {
          await  client.invalidateQueries({ queryKey: ["users"]});
        },
    });
};