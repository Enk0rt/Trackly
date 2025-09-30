"use client";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { AdminActions } from "@/components/admin/AdminActions";
import { useUserSelection } from "@/hooks/admin/useUserSelection";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { useFetchUsers } from "@/hooks/admin/useFetchUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminActions } from "@/hooks/admin/useAdminActions";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";


type Props = {
    currentUsers: IUsersResponseWithParams;
};

export const AdminUserList = ({ currentUsers }: Props) => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(3);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const client = useQueryClient();

    const { data: response, refetch } = useFetchUsers(
        page,
        pageSize,
        searchValue,
        undefined,
        undefined,
        currentUsers,
    );

    const { chooseMode, selectedIds, toggleUserSelection, activateChooseMode, setSelectedIds } = useUserSelection();

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
    }, [error]);

    return (
        <>
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
                chooseMode={chooseMode}
                selectedCount={selectedIds.size}
                onDelete={handleDelete}
                onBlock={handleBlock}
                onUnblock={handleUnblock}
                onVerify={handleVerify}
                onSendVerification={handleSendVerification}
                setSearchValue={setSearchValue}
                onSearch={handleSearch}
            />

            <div className="mt-3 flex flex-col gap-5">

                {
                    response?.data.length === 0 ?
                        <div className="flex justify-center items-center h-[50vh]">
                            <p className='text-[20px] text-[#33674E] dark:text-white'>Users are not found</p>
                        </div>

                        :
                        response?.data.map((user) => (
                            <AdminUserItem
                                key={user._id}
                                user={user}
                                isChooseMode={chooseMode}
                                toggleUserSelection={toggleUserSelection}
                                isSelected={selectedIds.has(user._id)}
                                activateChooseMode={activateChooseMode}
                            />))
                }

            </div>


            {
                response?.data.length !== 0 &&
                <div className=" mt-5 flex justify-center ">
                    <div className="flex items-center w-fit gap-10">
                        <button disabled={page === 1} onClick={() => {
                            setPage(page - 1);
                        }} className="cursor-pointer">
                            <ArrowLeftIcon className={"w-[26px] h-[26px] dark:text-white text-[#33674E]"} />
                        </button>
                        <div
                            className="flex justify-center items-center w-[30px] h-[30px] rounded-[4px] dark:bg-white bg-[#33674E] dark:text-[#33674E] text-white">
                            <p>
                                {page}
                            </p>
                        </div>
                        <button disabled={page === currentUsers.totalPages} onClick={() => {
                            setPage(page + 1);
                        }} className="cursor-pointer">
                            <ArrowRightIcon className={"w-[26px] h-[26px] dark:text-white text-[#33674E]"} />
                        </button>
                    </div>
                </div>}
        </>
    );
};