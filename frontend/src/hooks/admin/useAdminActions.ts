import { useCallback, useMemo } from "react";
import { NotificationEnum } from "@/enums/notificationEnum";
import { adminService } from "@/services/admin/adminService";

export const useAdminActions = (selectedIds: Set<string>, setSelectedIds: (ids: Set<string>) => void, setNotification: (message: string, type: NotificationEnum) => void) => {
    const clearSelection = useCallback(() => setSelectedIds(new Set()), [setSelectedIds]);

    return useMemo(() => ({
        handleDelete: async (ids: Set<string>, fetchUsers: () => void,
        ) => {
            try {
                if (ids.size === 1) {
                    await adminService.deleteOneUser(Array.from(ids)[0]);
                    setNotification("User is deleted", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
                if (ids.size === 0) {
                    setNotification("Select a user at first to take action", NotificationEnum.WARNING);
                    return;
                }
                if (ids.size > 1) {
                    await adminService.deleteManyUsers(Array.from(ids));
                    setNotification("Users are deleted", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
            } catch {
            }
        },
        handleBlock: async (ids: Set<string>, fetchUsers: () => void,
        ) => {
            try {
                if (ids.size === 1) {
                    await adminService.blockOneUser(Array.from(ids)[0]);
                    setNotification("User is blocked", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
                if (ids.size === 0) {
                    setNotification("Select a user at first to take action", NotificationEnum.WARNING);
                    return;
                }
                if (ids.size > 1) {
                    await adminService.blockManyUsers(Array.from(ids));
                    setNotification("Users are blocked", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
            } catch {
            }
        },
        handleUnblock: async (ids: Set<string>, fetchUsers: () => void,
        ) => {
            try {
                if (ids.size === 1) {
                    await adminService.unblockOneUser(Array.from(ids)[0]);
                    setNotification("User is unblocked", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
                if (ids.size === 0) {
                    setNotification("Select a user at first to take action", NotificationEnum.WARNING);
                    return;
                }
                if (ids.size > 1) {
                    await adminService.unblockManyUsers(Array.from(ids));
                    setNotification("Users are unblocked", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
            } catch {
            }
        },
        handleVerify: async (ids: Set<string>, fetchUsers: () => void,
        ) => {
            try {
                if (ids.size === 1) {
                    await adminService.verifyOneUser(Array.from(ids)[0]);
                    setNotification("User is verified", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                    return;
                }
                if (ids.size === 0) {
                    setNotification("Select a user at first to take action", NotificationEnum.WARNING);
                    return;
                }
                if (ids.size > 1) {
                    await adminService.verifyManyUsers(Array.from(ids));
                    setNotification("Users are verified", NotificationEnum.SUCCESS);
                    fetchUsers();
                    clearSelection();
                }
            } catch {
            }
        },
        handleSendVerification: async (ids: Set<string>) => {
            try {
                if (selectedIds.size === 0) {
                    setNotification("User was not chosen, action is not taken", NotificationEnum.WARNING);
                    return;
                }
                if (selectedIds.size === 1) {
                    await adminService.sendVerification(Array.from(ids)[0]);
                    setNotification("Verification letter was sent to a user", NotificationEnum.SUCCESS);
                    clearSelection();
                    return;
                } else {
                    setNotification("Verification letter was not sent, choose only one user", NotificationEnum.ERROR);
                    clearSelection();
                }

            } catch {

            }
        },
        handleChangeRole: async (id: string, role: string,fetchUsers:()=>void) => {
            await adminService.changeRole(id, role);
            setNotification("Permissions were updated", NotificationEnum.SUCCESS);
            fetchUsers();
        },
    }), [selectedIds, clearSelection, setNotification]);
};