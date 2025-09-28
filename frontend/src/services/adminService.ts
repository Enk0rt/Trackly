import { api } from "@/services/api/axiosInstanse";

type DeleteResult = {
    acknowledged: boolean,
    deletedCount: number
}

export const adminService = {
    async deleteOneUser(id: string): Promise<void> {
        await api.delete(`/admin/${id}`);
    },
    async deleteManyUsers(ids: string[]): Promise<DeleteResult> {
        const res = await api.post<DeleteResult>("/admin/bulk-delete", { ids });
        return res.data;
    }
};