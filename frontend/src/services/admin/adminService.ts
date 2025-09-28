import { api } from "@/services/api/axiosInstanse";
import { IUser } from "@/interfaces/user/IUser";

type DeleteResult = {
    acknowledged: boolean,
    deletedCount: number
}

type UpdateResult = {
    acknowledged: boolean,
    updatedCount: number
}
export const adminService = {
    async deleteOneUser(id: string): Promise<void> {
        await api.delete(`/admin/${id}`);
    },
    async deleteManyUsers(ids: string[]): Promise<DeleteResult> {
        const res = await api.post<DeleteResult>("/admin/bulk-delete", { ids });
        return res.data;
    },

    async blockOneUser(id: string): Promise<void> {
        await api.patch(`/admin/block/${id}`);
    },
    async blockManyUsers(ids: string[]): Promise<{ users: IUser[], updateResult: UpdateResult }> {
        const res = await api.patch(`/admin/block`, {
            ids,
        });
        return res.data;
    },

    async unblockOneUser(id: string): Promise<void> {
        await api.patch(`/admin/unblock/${id}`);
    },
    async unblockManyUsers(ids: string[]): Promise<{ users: IUser[], updateResult: UpdateResult }> {
        const res = await api.patch(`/admin/unblock`, {
            ids,
        });
        return res.data;
    },
};