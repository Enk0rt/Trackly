"use client";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { useDeleteUser } from "@/hooks/mutations/useDeleteOneUser";
import { useDeleteUsers } from "@/hooks/mutations/useDeleteManyUsers";
import { AdminActions } from "@/components/admin/AdminActions";
import { useUserSelection } from "@/hooks/admin/useUserSelection";
import { useBlockOneUser } from "@/hooks/mutations/useBlockOneUser";
import { useBlockManyUsers } from "@/hooks/mutations/useBlockManyUsers";
import { useUnblockManyUsers } from "@/hooks/mutations/useUnblockManyUsers";
import { useUnblockOneUser } from "@/hooks/mutations/useUnblockOneUser";
import { useVerifyOneUser } from "@/hooks/mutations/useVerifyOneUser";
import { useVerifyManyUsers } from "@/hooks/mutations/useVerifyManyUsers";
import { useSendVerification } from "@/hooks/mutations/useSendVerification";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import { useFetchUsers } from "@/hooks/admin/useFetchUsers";
import { useQueryClient } from "@tanstack/react-query";


type Props = {
    currentUsers: IUsersResponseWithParams;
};

export const AdminUserList = ({ currentUsers }: Props) => {
    const [page,setPage] = useState(1);
    const [pageSize] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const client = useQueryClient();
    const { data: response } = useFetchUsers(
        page,
        pageSize,
        searchValue,
        undefined,
        undefined,
        currentUsers,
    );

    const { chooseMode, selectedIds, toggleUserSelection, activateChooseMode, setSelectedIds } = useUserSelection();

    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: deleteManyUsers } = useDeleteUsers();

    const { mutate: blockUser } = useBlockOneUser();
    const { mutate: blockManyUsers } = useBlockManyUsers();

    const { mutate: unblockUser } = useUnblockOneUser();
    const { mutate: unblockManyUsers } = useUnblockManyUsers();

    const { mutate: verifyUser } = useVerifyOneUser();
    const { mutate: verifyManyUsers } = useVerifyManyUsers();

    const { mutate: sendVerification } = useSendVerification();

    const handleDelete = () => {
        if (selectedIds.size === 0) {
            return;
        } else if (selectedIds.size === 1) {
            deleteUser(Array.from(selectedIds)[0]);
        } else {
            deleteManyUsers(Array.from(selectedIds));
        }
        setSelectedIds(new Set());
    };

    const handleBlock = () => {
        if (selectedIds.size === 0) {
            return;
        } else if (selectedIds.size === 1) {
            blockUser(Array.from(selectedIds)[0]);
        } else {
            blockManyUsers(Array.from(selectedIds));
        }
        setSelectedIds(new Set());
    };

    const handleUnblock = () => {
        if (selectedIds.size === 0) {
            return;
        } else if (selectedIds.size === 1) {
            unblockUser(Array.from(selectedIds)[0]);
        } else {
            unblockManyUsers(Array.from(selectedIds));
        }
        setSelectedIds(new Set());
    };

    const handleVerify = () => {
        if (selectedIds.size === 0) {
            return;
        } else if (selectedIds.size === 1) {
            verifyUser(Array.from(selectedIds)[0]);
        } else {
            verifyManyUsers(Array.from(selectedIds));
        }
        setSelectedIds(new Set());
    };

    const handleSendVerification = () => {
        if (selectedIds.size === 0) {
            return;
        } else if (selectedIds.size === 1) {
            sendVerification(Array.from(selectedIds)[0]);
        } else {
            setError("Verification letter was not sent, choose only one user");
        }

        setSelectedIds(new Set());
    };

    const handleSearch = async () => {
        setPage(1)
        client.invalidateQueries({
            queryKey: ["users"],
        });
    };

    useEffect(() => {
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
                searchValue={searchValue}
                onSearch={handleSearch}
            />
            <div className="mt-3 flex flex-col gap-5">
                {response?.data.map((user) => (
                    <AdminUserItem
                        key={user._id}
                        user={user}
                        isChooseMode={chooseMode}
                        toggleUserSelection={toggleUserSelection}
                        isSelected={selectedIds.has(user._id)}
                        activateChooseMode={activateChooseMode}
                    />
                ))}
            </div>
        </>
    );
};