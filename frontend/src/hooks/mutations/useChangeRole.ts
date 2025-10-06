import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";

export const useChangeRole = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: ({ id, role }: { id: string; role: string }) => adminService.changeRole(id, role),
        onSuccess: async () => {
            await client.invalidateQueries({ queryKey: ["users"] });
        },
    });
};