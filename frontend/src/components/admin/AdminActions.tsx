import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import UserBlockIcon from "@/components/ui/svg/user/UserBlockIcon";
import Delete from "@/components/ui/svg/buttons/Delete";
import UserUnblockIcon from "@/components/ui/svg/user/UserUnblockIcon";
import UserVerifyIcon from "@/components/ui/svg/user/UserVerifyIcon";
import UserSendVerificationIcon from "@/components/ui/svg/user/UserSendVerificationIcon";
import AdminUserSearch from "@/components/admin/AdminUserSearch";
import React, { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import AdminSort from "@/components/admin/AdminSort";
import DefaultCheckbox from "@/components/ui/checkboxes/DefaultCheckbox";
import SettingsIcon from "@/components/ui/svg/buttons/SettingsIcon";
import { NotificationEnum } from "@/enums/notificationEnum";
import { useAdminActions } from "@/hooks/admin/useAdminActions";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { getDataFromClient } from "@/services/api/getDataFromClient";

type Props = {
    setUsers:Dispatch<SetStateAction<IUsersResponseWithParams>>,
    setPage: Dispatch<SetStateAction<number>>
    pageSize: number,
    chooseMode: boolean;
    selectedIds: Set<string>;
    setSelectedIds: Dispatch<SetStateAction<Set<string>>>,
    addNotification: (message: string, type: NotificationEnum) => void,
    fetchUsers: () => Promise<void>
    setSearchValue: Dispatch<SetStateAction<string | undefined>>;
    setSortValue: Dispatch<SetStateAction<string | undefined>>;
    sortValue: string | undefined;
    searchValue: string | undefined;
    showOnlySelected: boolean,
    setShowOnlySelected: Dispatch<SetStateAction<boolean>>,
    setShowModal: Dispatch<SetStateAction<boolean>>
    initialQuery: {
        search: string | undefined,
        sort: string | undefined,
        sortDirection: "desc" | "asc" | 1 | -1
    }
};


const AdminActions: FC<Props> = ({
                                     setUsers,
                                     pageSize,
                                     chooseMode,
                                     selectedIds,
                                     setSelectedIds,
                                     addNotification,
                                     fetchUsers,
                                     setSearchValue,
                                     setSortValue,
                                     sortValue,
                                     searchValue,
                                     setPage,
                                     showOnlySelected,
                                     setShowOnlySelected,
                                     setShowModal,
                                     initialQuery
                                 }) => {

    const handleSearch = useCallback(async () => {
        setPage(1);
        const users = await getDataFromClient.getUsersWithParams(1, pageSize, searchValue, sortValue);
        setUsers(users);
    }, [pageSize, searchValue, sortValue, setPage, setUsers]);

    const {
        handleBlock,
        handleUnblock,
        handleDelete,
        handleVerify,
        handleSendVerification,
    } = useAdminActions(selectedIds, setSelectedIds, addNotification,setShowOnlySelected);

    const actions = [
        { onClick: ()=>handleBlock(selectedIds,fetchUsers), icon: UserBlockIcon, label: "Block user" },
        { onClick: ()=>handleUnblock(selectedIds,fetchUsers), icon: UserUnblockIcon, label: "Unblock user" },
        { onClick: ()=>handleVerify(selectedIds,fetchUsers), icon: UserVerifyIcon, label: "Verify user" },
        { onClick: ()=>handleSendVerification(selectedIds), icon: UserSendVerificationIcon, label: "Send verification" },
        { onClick: ()=>handleDelete(selectedIds,fetchUsers), icon: Delete, label: "Delete user" },
        { onClick: () => setShowModal(true), icon: SettingsIcon, label: "Open settings" },
    ];

    const action = useCallback(async () => {
        setShowOnlySelected(prev => !prev);

        if (!showOnlySelected) {
            const users = await getDataFromClient.getUsersWithParams(1,selectedIds.size,'',undefined,undefined,[...selectedIds]);
            setUsers(users);
        } else {
            await fetchUsers();
        }
    }, [setShowOnlySelected, showOnlySelected, selectedIds, setUsers, fetchUsers]);
    return (
        <div className="flex items-center w-full justify-between gap-4">
            <div className="flex items-center gap-4">
                <AdminSort sortValue={sortValue} setSortValue={setSortValue} setPage={setPage} />

                <AnimatePresence>
                    {chooseMode ? (
                        <>
                            <motion.p
                                key="overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="text-[#33674E] dark:text-white"
                            >
                                Total selected items : {selectedIds.size}
                            </motion.p>
                            <div className="flex items-center gap-2 ">
                                <p className="text-[#33674E] dark:text-white">
                                    Only selected
                                </p>
                                <DefaultCheckbox
                                    action={action}
                                    condition={showOnlySelected}
                                />
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex items-center">
                <AdminUserSearch setSearchValue={setSearchValue} onSearch={()=>handleSearch} setPage={setPage} initialSearch={initialQuery.search} />

                <div className="flex gap-2 justify-end">
                    {actions.map((item, index) =>
                        <ActionButton key={index} {...item} iconSize={"w-[26px] h-[26px]"}
                                      size={"round"} variant={"ghost"}
                                      className={"rounded-full hover:!bg-black/10"} />)}
                </div>
            </div>
        </div>
    );
};
export default memo(AdminActions);