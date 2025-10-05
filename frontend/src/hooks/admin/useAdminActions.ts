import { useDeleteUser } from "@/hooks/mutations/useDeleteOneUser";
import { useDeleteUsers } from "@/hooks/mutations/useDeleteManyUsers";
import { useBlockOneUser } from "@/hooks/mutations/useBlockOneUser";
import { useBlockManyUsers } from "@/hooks/mutations/useBlockManyUsers";
import { useUnblockOneUser } from "@/hooks/mutations/useUnblockOneUser";
import { useUnblockManyUsers } from "@/hooks/mutations/useUnblockManyUsers";
import { useVerifyOneUser } from "@/hooks/mutations/useVerifyOneUser";
import { useVerifyManyUsers } from "@/hooks/mutations/useVerifyManyUsers";
import { useSendVerification } from "@/hooks/mutations/useSendVerification";
import { useCallback, useMemo } from "react";
import { NotificationEnum } from "@/enums/notificationEnum";

export const useAdminActions = (selectedIds: Set<string>, setSelectedIds: (ids: Set<string>) => void, setNotification: (message: string, type: NotificationEnum) => void) => {
    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: deleteManyUsers } = useDeleteUsers();

    const { mutate: blockUser } = useBlockOneUser();
    const { mutate: blockManyUsers } = useBlockManyUsers();

    const { mutate: unblockUser } = useUnblockOneUser();
    const { mutate: unblockManyUsers } = useUnblockManyUsers();

    const { mutate: verifyUser } = useVerifyOneUser();
    const { mutate: verifyManyUsers } = useVerifyManyUsers();

    const { mutate: sendVerification } = useSendVerification();

    const clearSelection = useCallback(() => setSelectedIds(new Set()), [setSelectedIds]);

    return useMemo(() => ({
        handleDelete: () => {
            if (selectedIds.size === 0) {
                setNotification("No users were chosen, action is not taken", NotificationEnum.WARNING);
                return;
            }
            if (selectedIds.size === 1) {
                deleteUser(Array.from(selectedIds)[0]);
                setNotification(`Success, user is deleted`, NotificationEnum.SUCCESS);
            } else {
                deleteManyUsers(Array.from(selectedIds));
                setNotification(`Success, users are deleted`, NotificationEnum.SUCCESS);
            }
            clearSelection();
        },
        handleBlock: () => {
            if (selectedIds.size === 0) {
                setNotification("No users were chosen, action is not taken", NotificationEnum.WARNING);
                return;
            }

            if (selectedIds.size === 1) {
                blockUser(Array.from(selectedIds)[0]);
                setNotification(`Success, user is restricted`, NotificationEnum.SUCCESS);
            } else {
                setNotification(`Success, users are restricted`, NotificationEnum.SUCCESS);
                blockManyUsers(Array.from(selectedIds));
            }
            clearSelection();
        },
        handleUnblock: () => {
            if (selectedIds.size === 0) {
                setNotification("No users were chosen, action is not taken", NotificationEnum.WARNING);
                return;
            }

            if (selectedIds.size === 1) {
                setNotification(`Success, user is unblocked`, NotificationEnum.SUCCESS);
                unblockUser(Array.from(selectedIds)[0]);
            } else {
                setNotification(`Success, users are unblocked`, NotificationEnum.SUCCESS);
                unblockManyUsers(Array.from(selectedIds));
            }
            clearSelection();
        },
        handleVerify: () => {
            if (selectedIds.size === 0) {
                setNotification("No users were chosen, action is not taken", NotificationEnum.WARNING);
                return;
            }
            if (selectedIds.size === 1) {
                verifyUser(Array.from(selectedIds)[0]);
                setNotification(`Success, user email is verified`, NotificationEnum.SUCCESS);
            } else {
                verifyManyUsers(Array.from(selectedIds));
                setNotification(`Success, users are verified, ${selectedIds.size} users updated`, NotificationEnum.SUCCESS);
            }
            clearSelection();
        },
        handleSendVerification: () => {
            if (selectedIds.size === 0) {
                setNotification("User was not chosen, action is not taken", NotificationEnum.WARNING);
                return;
            }
            if (selectedIds.size === 1) {
                sendVerification(Array.from(selectedIds)[0]);
                setNotification("Verification letter was sent to a user", NotificationEnum.SUCCESS);
            } else {
                setNotification("Verification letter was not sent, choose only one user", NotificationEnum.ERROR);
            }
            clearSelection();
        },
    }), [selectedIds, clearSelection, setNotification, deleteUser, deleteManyUsers, blockUser, blockManyUsers, unblockUser, unblockManyUsers, verifyUser, verifyManyUsers, sendVerification]);
};