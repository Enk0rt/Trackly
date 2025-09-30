import { useDeleteUser } from "@/hooks/mutations/useDeleteOneUser";
import { useDeleteUsers } from "@/hooks/mutations/useDeleteManyUsers";
import { useBlockOneUser } from "@/hooks/mutations/useBlockOneUser";
import { useBlockManyUsers } from "@/hooks/mutations/useBlockManyUsers";
import { useUnblockOneUser } from "@/hooks/mutations/useUnblockOneUser";
import { useUnblockManyUsers } from "@/hooks/mutations/useUnblockManyUsers";
import { useVerifyOneUser } from "@/hooks/mutations/useVerifyOneUser";
import { useVerifyManyUsers } from "@/hooks/mutations/useVerifyManyUsers";
import { useSendVerification } from "@/hooks/mutations/useSendVerification";

export const useAdminActions = (selectedIds: Set<string>, setSelectedIds: (ids: Set<string>) => void, setError: (err: string | null) => void) => {
    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: deleteManyUsers } = useDeleteUsers();

    const { mutate: blockUser } = useBlockOneUser();
    const { mutate: blockManyUsers } = useBlockManyUsers();

    const { mutate: unblockUser } = useUnblockOneUser();
    const { mutate: unblockManyUsers } = useUnblockManyUsers();

    const { mutate: verifyUser } = useVerifyOneUser();
    const { mutate: verifyManyUsers } = useVerifyManyUsers();

    const { mutate: sendVerification } = useSendVerification();

    const clearSelection = () => setSelectedIds(new Set());

    return {
        handleDelete: () => {
            if (selectedIds.size === 0) return;

            if (selectedIds.size === 1) {
                deleteUser(Array.from(selectedIds)[0]);
            } else {
                deleteManyUsers(Array.from(selectedIds));
            }

            clearSelection();
        },
        handleBlock: () => {
            if (selectedIds.size === 0) return;

            if (selectedIds.size === 1) {
                blockUser(Array.from(selectedIds)[0]);
            } else {
                blockManyUsers(Array.from(selectedIds));
            }

            clearSelection();
        },
        handleUnblock: () => {
            if (selectedIds.size === 0) return;

            if (selectedIds.size === 1) {
                unblockUser(Array.from(selectedIds)[0]);
            } else {
                unblockManyUsers(Array.from(selectedIds));
            }

            clearSelection();
        },
        handleVerify: () => {
            if (selectedIds.size === 0) return;

            if (selectedIds.size === 1) {
                verifyUser(Array.from(selectedIds)[0]);
            } else {
                verifyManyUsers(Array.from(selectedIds));
            }

            clearSelection();
        },
        handleSendVerification: () => {
            if (selectedIds.size === 0) return;

            if (selectedIds.size === 1) {
                sendVerification(Array.from(selectedIds)[0]);
            } else {
                setError("Verification letter was not sent, choose only one user");
            }

            clearSelection();
        },
    };
};