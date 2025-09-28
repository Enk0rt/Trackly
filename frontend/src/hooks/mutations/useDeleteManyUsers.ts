import { adminService } from "@/services/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUsers = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => adminService.deleteManyUsers(ids),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["users"] });
        },
    });
}