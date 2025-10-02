import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import UserBlockIcon from "@/components/ui/svg/user/UserBlockIcon";
import Delete from "@/components/ui/svg/buttons/Delete";
import UserUnblockIcon from "@/components/ui/svg/user/UserUnblockIcon";
import UserVerifyIcon from "@/components/ui/svg/user/UserVerifyIcon";
import UserSendVerificationIcon from "@/components/ui/svg/user/UserSendVerificationIcon";
import { AdminUserSearch } from "@/components/admin/AdminUserSearch";
import React, { Dispatch, SetStateAction } from "react";
import AdminSort from "@/components/admin/AdminSort";
import { DefaultCheckbox } from "@/components/ui/checkboxes/DefaultCheckbox";
import SettingsIcon from "@/components/ui/svg/buttons/SettingsIcon";

type Props = {
    setPage: Dispatch<SetStateAction<number>>
    pageSize: number,
    setPageSize: Dispatch<SetStateAction<number>>
    chooseMode: boolean;
    selectedCount: number;
    onDelete: () => void;
    onBlock: () => void;
    onUnblock: () => void;
    onVerify: () => void;
    onSendVerification: () => void;
    setSearchValue: Dispatch<SetStateAction<string>>;
    setSortValue: Dispatch<SetStateAction<string | undefined>>;
    sortValue: string | undefined;
    onSearch: () => void;
    showOnlySelected: boolean,
    setShowOnlySelected: Dispatch<SetStateAction<boolean>>,
    setShowModal: Dispatch<SetStateAction<boolean>>
};


export const AdminActions = ({
                                 setPageSize,
                                 chooseMode,
                                 selectedCount,
                                 onDelete,
                                 onBlock,
                                 onUnblock,
                                 onVerify,
                                 onSendVerification,
                                 setSearchValue,
                                 setSortValue,
                                 sortValue,
                                 onSearch,
                                 setPage,
                                 showOnlySelected,
                                 setShowOnlySelected,
                                 setShowModal,
                             }: Props) => {


    const actions = [
        { onClick: onBlock, icon: UserBlockIcon, label: "Block user" },
        { onClick: onUnblock, icon: UserUnblockIcon, label: "Unblock user" },
        { onClick: onVerify, icon: UserVerifyIcon, label: "Verify user" },
        { onClick: onSendVerification, icon: UserSendVerificationIcon, label: "Send verification" },
        { onClick: onDelete, icon: Delete, label: "Delete user" },
        { onClick: () => setShowModal(true), icon: SettingsIcon, label: "Open settings" },
    ];

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
                                Total selected items : {selectedCount}
                            </motion.p>
                            <div className="flex items-center gap-2 ">
                                <p className="text-[#33674E] dark:text-white">
                                    Only selected
                                </p>
                                <DefaultCheckbox
                                    action={async () => {
                                        if (selectedCount === 0) {
                                            return;
                                        }

                                        setShowOnlySelected(prev => {
                                            const next = !prev;
                                            setPage(1);
                                            setPageSize(next ? 9999 : 3);
                                            return next;
                                        });
                                    }}
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
                <AdminUserSearch setSearchValue={setSearchValue} onSearch={onSearch} />

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
export default AdminActions;