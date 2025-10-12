"use client";
import AdminActions from "@/components/admin/AdminActions";
import { useUserSelection } from "@/hooks/admin/useUserSelection";
import React, { FC, memo, useEffect, useState } from "react";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { useAdminActions } from "@/hooks/admin/useAdminActions";
import DefaultModal from "@/components/ui/modals/DefaultModal";
import AdminPanelSettings from "@/components/admin/AdminPanelSettings";
import Notification from "@/components/ui/modals/Notification";
import { AnimatePresence } from "framer-motion";
import { useNotification } from "@/hooks/useNotification";
import Pagination from "@/components/ui/pagination/Pagination";
import AdminUserItem from "@/components/admin/AdminUserItem/AdminUserItem";
import { getDataFromClient } from "@/services/api/getDataFromClient";
import { useFetchUsers } from "@/hooks/admin/useFetchUsers";

type Props = {
    currentUsers: IUsersResponseWithParams;
};

const AdminUserList: FC<Props> = ({ currentUsers }) => {
    const [users, setUsers] = useState<IUsersResponseWithParams>(currentUsers);
    const [searchValue, setSearchValue] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sortValue, setSortValue] = useState<string | undefined>(undefined);
    const { addNotification, closeNotification, notifications } = useNotification();
    const {
        page, setPage, pageSize, setPageSize,
        chooseMode,
        selectedIds,
        showOnlySelected,
        setShowOnlySelected,
        toggleUserSelection,
        activateChooseMode,
        setSelectedIds,
    } = useUserSelection();


    const selectedUsers = users.data?.filter(item => selectedIds.has(item._id));
    const { fetchUsers } = useFetchUsers(page, pageSize, searchValue, sortValue, setUsers);

    const {
        handleDelete,
        handleBlock,
        handleUnblock,
        handleVerify,
        handleSendVerification,
        handleChangeRole,
    } = useAdminActions(selectedIds, setSelectedIds, addNotification);

    const handleSearch = async () => {
        setPage(1);
        const users = await getDataFromClient.getUsersWithParams(1, 3, searchValue, sortValue);
        setUsers(users);
    };


    useEffect(() => {
        fetchUsers();
        if (selectedIds.size === 0 && showOnlySelected) {
            setShowOnlySelected(false);

        }
    }, [showOnlySelected, setShowOnlySelected, fetchUsers, selectedIds.size]);


    return (
        <>
            <DefaultModal showModal={showModal} setShowModal={setShowModal}>
                <AdminPanelSettings pageSize={pageSize} setPageSize={setPageSize} />
            </DefaultModal>
            <div className="w-[84%] max-w-[1249px]">
                <AnimatePresence>
                    {
                        notifications &&
                        <Notification notifications={notifications} onClose={closeNotification} />
                    }
                </AnimatePresence>
                <AdminActions
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    chooseMode={chooseMode}
                    selectedCount={selectedIds.size}
                    onDelete={handleDelete}
                    onBlock={() => handleBlock(selectedIds,fetchUsers)}
                    onUnblock={() => handleUnblock(selectedIds,fetchUsers)}
                    onVerify={handleVerify}
                    onSendVerification={handleSendVerification}
                    setSearchValue={setSearchValue}
                    onSearch={handleSearch}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    showOnlySelected={showOnlySelected}
                    setShowOnlySelected={setShowOnlySelected}
                    setShowModal={setShowModal}
                />

                <div className="mt-3 flex flex-col gap-5">
                    {users.data?.length === 0 ? (
                        <div className="flex justify-center items-center h-[50vh]">
                            <p className="text-[20px] text-[#33674E] dark:text-white">
                                Users are not found
                            </p>
                        </div>
                    ) : (
                        (showOnlySelected && selectedUsers
                                ? selectedUsers
                                : users.data || []
                        ).map(user => (
                            <AdminUserItem
                                key={user._id}
                                user={user}
                                isChooseMode={chooseMode}
                                toggleUserSelection={toggleUserSelection}
                                isSelected={selectedIds.has(user._id)}
                                activateChooseMode={activateChooseMode}
                                changeRole={handleChangeRole}
                            />
                        ))
                    )}
                </div>

                {
                    users?.data?.length !== 0 && !showOnlySelected &&
                    <Pagination actionPrev={() => {
                        setPage(page - 1);
                        fetchUsers();
                    }} actionNext={() => setPage(page + 1)} page={page}
                                disabledPrev={page === 1}
                                disabledNext={page === currentUsers?.totalPages || showOnlySelected || pageSize >= users?.total} />
                }
            </div>
        </>
    );
};

export default memo(AdminUserList);