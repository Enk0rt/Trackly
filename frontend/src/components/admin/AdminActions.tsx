import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import UserBlockIcon from "@/components/ui/svg/user/UserBlockIcon";
import Delete from "@/components/ui/svg/buttons/Delete";
import UserUnblockIcon from "@/components/ui/svg/user/UserUnblockIcon";
import UserVerifyIcon from "@/components/ui/svg/user/UserVerifyIcon";
import UserSendVerificationIcon from "@/components/ui/svg/user/UserSendVerificationIcon";
import { AdminUserSearch } from "@/components/admin/AdminUserSearch";
import { Dispatch, SetStateAction } from "react";

type Props = {
    chooseMode: boolean;
    selectedCount: number;
    onDelete: () => void;
    onBlock: () => void;
    onUnblock: () => void;
    onVerify: () => void;
    onSendVerification: () => void;
    setSearchValue: Dispatch<SetStateAction<string>>;
    onSearch: () => void;
};


export const AdminActions = ({
                                 chooseMode,
                                 selectedCount,
                                 onDelete,
                                 onBlock,
                                 onUnblock,
                                 onVerify,
                                 onSendVerification,
                                 setSearchValue,
                                 onSearch,
                             }: Props) => {

    const actions = [
        { onClick: onBlock, icon: UserBlockIcon, label: "Block user" },
        { onClick: onUnblock, icon: UserUnblockIcon, label: "Unblock user" },
        { onClick: onVerify, icon: UserVerifyIcon, label: "Verify user" },
        { onClick: onSendVerification, icon: UserSendVerificationIcon, label: "Send verification" },
        { onClick: onDelete, icon: Delete, label: "Delete user" },
    ];


    return (

        <div className="flex items-center justify-end gap-4">
            <AnimatePresence>
                {chooseMode ? (
                    <motion.p
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-[#33674E] dark:text-white grow-1"
                    >
                        Total selected items : {selectedCount}
                    </motion.p>
                ) : (
                    <div />
                )}
            </AnimatePresence>

            <AdminUserSearch setSearchValue={setSearchValue} onSearch={onSearch} />

            <div className="flex gap-2 justify-end">
                {actions.map((item, index) =>
                    <ActionButton key={index} {...item} iconSize={"w-[26px] h-[26px]"}
                                  size={"round"} variant={"ghost"}
                                  className={"rounded-full hover:!bg-black/10"} />)}
            </div>
        </div>
    );
};
export default AdminActions;