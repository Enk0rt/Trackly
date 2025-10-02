"use client";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { AdminActions } from "@/components/admin/AdminActions";
import { useUserSelection } from "@/hooks/admin/useUserSelection";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { useFetchUsers } from "@/hooks/admin/useFetchUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminActions } from "@/hooks/admin/useAdminActions";
import { ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/24/outline";
import DefaultModal from "@/components/ui/modals/DefaultModal";
import { AdminPanelSettings } from "@/components/admin/AdminPanelSettings";

type Props = {
    currentUsers: IUsersResponseWithParams;
};

export const AdminUserList = ({ currentUsers }: Props) => {
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sortValue, setSortValue] = useState<string | undefined>(undefined);

    const client = useQueryClient();

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

    const { data: response, refetch } = useFetchUsers(
        page,
        pageSize,
        searchValue,
        sortValue,
        undefined,
        currentUsers,
    );

    const selectedUsers = response?.data?.filter(item => selectedIds.has(item._id));

    const {
        handleDelete,
        handleBlock,
        handleUnblock,
        handleVerify,
        handleSendVerification,
    } = useAdminActions(selectedIds, setSelectedIds, setError);

    const handleSearch = async () => {
        setPage(1);
        await refetch();
    };

    useEffect(() => {
        if (searchValue.trim() === "") {
            client.removeQueries({
                queryKey: ["users", page, pageSize, "", undefined, undefined],
            });
        }
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 10000);

            return () => clearTimeout(timer);
        }

        if (selectedIds.size === 0 && showOnlySelected) {
            setShowOnlySelected(false);
            setPageSize(3);
            setPage(1);
        }
    }, [error]);

    return (
        <>
            <DefaultModal showModal={showModal} setShowModal={setShowModal}>
                <AdminPanelSettings pageSize={pageSize} setPageSize={setPageSize} />
            </DefaultModal>
            <div className="w-[84%] max-w-[1249px]">
                <AnimatePresence>
                    {
                        error &&
                        <motion.div
                            key={"overlay"}
                            initial={{ translateX: -100, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 100 }}
                            exit={{ translateX: -100, opacity: 0 }}
                            transition={{ duration: .4, ease: "easeInOut" }}
                            className={`absolute z-[1] top-[-20px] px-7 py-4 w-fit bg-white  rounded-[14px] text-[#33674E]`}>
                            <p>{error}</p>
                            <div onClick={() => setError(null)} className="absolute right-[10px] top-0 cursor-pointer">
                                x
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>

                <AdminActions
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    chooseMode={chooseMode}
                    selectedCount={selectedIds.size}
                    onDelete={handleDelete}
                    onBlock={handleBlock}
                    onUnblock={handleUnblock}
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
                    {response?.data.length === 0 ? (
                        <div className="flex justify-center items-center h-[50vh]">
                            <p className="text-[20px] text-[#33674E] dark:text-white">
                                Users are not found
                            </p>
                        </div>
                    ) : (
                        (showOnlySelected && selectedUsers
                                ? selectedUsers
                                : response?.data || []
                        ).map(user => (
                            <AdminUserItem
                                key={user._id}
                                user={user}
                                isChooseMode={chooseMode}
                                toggleUserSelection={toggleUserSelection}
                                isSelected={selectedIds.has(user._id)}
                                activateChooseMode={activateChooseMode}
                            />
                        ))
                    )}
                </div>
                {
                    response?.data.length !== 0 && !showOnlySelected &&
                    <div className=" mt-5 flex justify-center ">
                        <div className="flex items-center w-fit gap-10">
                            <button disabled={page === 1} onClick={() => {
                                setPage(page - 1);
                            }} className="cursor-pointer">
                                <ArrowLongLeftIcon
                                    className={"w-[26px] h-[26px] dark:text-white text-[#33674E] transform transition hover:-translate-x-1"} />
                            </button>
                            <div
                                className="flex justify-center items-center w-[30px] h-[30px] rounded-[4px] dark:bg-white bg-[#33674E] dark:text-[#33674E] text-white">
                                <p>
                                    {page}
                                </p>
                            </div>
                            <button disabled={page === currentUsers.totalPages || showOnlySelected} onClick={() => {
                                setPage(page + 1);
                            }} className="cursor-pointer">
                                <ArrowLongRightIcon
                                    className={`w-[26px] h-[26px] dark:text-white text-[#33674E] transform transition hover:translate-x-1 `} />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};