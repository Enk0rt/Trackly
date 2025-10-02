import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";


export const useSendVerification = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => adminService.sendVerification(id),
        onSuccess: async () => {
           await  client.invalidateQueries({ queryKey: ["users"]});
        },
    });
};