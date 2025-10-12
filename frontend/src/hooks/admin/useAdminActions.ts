import { useDeleteUser } from "@/hooks/mutations/useDeleteOneUser";
import { useDeleteUsers } from "@/hooks/mutations/useDeleteManyUsers";
import { useVerifyOneUser } from "@/hooks/mutations/useVerifyOneUser";
import { useVerifyManyUsers } from "@/hooks/mutations/useVerifyManyUsers";
import { useSendVerification } from "@/hooks/mutations/useSendVerification";
import { useCallback, useMemo } from "react";
import { NotificationEnum } from "@/enums/notificationEnum";
import { useChangeRole } from "@/hooks/mutations/useChangeRole";
import { adminService } from "@/services/admin/adminService";

export const useAdminActions = (selectedIds: Set<string>, setSelectedIds: (ids: Set<string>) => void, setNotification: (message: string, type: NotificationEnum) => void) => {
    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: deleteManyUsers } = useDeleteUsers();

    const { mutate: verifyUser } = useVerifyOneUser();
    const { mutate: verifyManyUsers } = useVerifyManyUsers();

    const { mutate: sendVerification } = useSendVerification();

    const { mutate: changeRole } = useChangeRole();

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
        handleBlock: async (ids: Set<string>, fetchUsers: () => void,
        ) => {
            try {
                if (ids.size === 1) {
                    await adminService.blockOneUser(Array.from(ids)[0]);
                    setNotification("User is blocked", NotificationEnum.SUCCESS);
                    return;
                }
                if (ids.size === 0) {
                    setNotification("Select a user at first to take action", NotificationEnum.WARNING);
                    return;
                }
                if (ids.size > 1) {
                    await adminService.blockManyUsers(Array.from(ids));
                    setNotification("Users are blocked", NotificationEnum.SUCCESS);
                }
                fetchUsers();
                clearSelection();
            } catch {
            }
        },
        handleUnblock: async (ids: Set<string>, fetchUsers: () => void,
        ) => {
            try {
                if (ids.size === 1) {
                    await adminService.unblockOneUser(Array.from(ids)[0]);
                    setNotification("User is unblocked", NotificationEnum.SUCCESS);
                }
                if (ids.size === 0) {
                    setNotification("Select a user at first to take action", NotificationEnum.WARNING);
                }
                if (ids.size > 1) {
                    await adminService.unblockManyUsers(Array.from(ids));
                    setNotification("Users are unblocked", NotificationEnum.SUCCESS);
                }
                fetchUsers();
                clearSelection();
            } catch {
            }
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
        handleChangeRole: (id: string, role: string) => {
            changeRole({ id, role });
            setNotification("Permissions were updated", NotificationEnum.SUCCESS);
        },
    }), [selectedIds, clearSelection, setNotification, deleteUser, deleteManyUsers, verifyUser, verifyManyUsers, sendVerification, changeRole]);
};