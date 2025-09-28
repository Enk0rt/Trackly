import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import UserBlockIcon from "@/components/ui/svg/user/UserBlockIcon";
import Delete from "@/components/ui/svg/buttons/Delete";
import UserUnblockIcon from "@/components/ui/svg/user/UserUnblockIcon";
import UserVerifyIcon from "@/components/ui/svg/user/UserVerifyIcon";
import UserSendVerificationIcon from "@/components/ui/svg/user/UserSendVerificationIcon";

type Props = {
    chooseMode: boolean;
    selectedCount: number;
    onDelete: () => void;
    onBlock: () => void;
    onUnblock: () => void;
    onVerify: () => void;
    onSendVerification: () => void;
};

export const AdminActions = ({ chooseMode, selectedCount, onDelete, onBlock, onUnblock, onVerify,onSendVerification }: Props) => (
    <div className="flex items-center justify-between">

        <AnimatePresence>
            {chooseMode ? (
                <motion.p
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[#33674E] dark:text-white"
                >
                    Total selected items : {selectedCount}
                </motion.p>
            ) : (
                <div />
            )}
        </AnimatePresence>

        <div className="flex gap-2 justify-end">
            <ActionButton onClick={onBlock} icon={UserBlockIcon} iconLabel="Block user" iconSize="w-[26px] h-[26px]"
                          variant="ghost" size="round" className="rounded-full hover:!bg-black/10">
            </ActionButton>
            <ActionButton onClick={onUnblock} icon={UserUnblockIcon} iconLabel="Unblock user"
                          iconSize="w-[26px] h-[26px]"
                          variant="ghost" size="round" className="rounded-full hover:!bg-black/10" />
            <ActionButton onClick={onVerify} icon={UserVerifyIcon} iconLabel="Verify user" iconSize="w-[26px] h-[26px]"
                          variant="ghost"
                          size="round" className="rounded-full hover:!bg-black/10" />
            <ActionButton onClick={onSendVerification} icon={UserSendVerificationIcon} iconLabel="Send verification letter" iconSize="w-[26px] h-[26px]"
                          variant="ghost"
                          size="round" className="rounded-full hover:!bg-black/10" />
            <ActionButton onClick={onDelete} icon={Delete} iconLabel="Delete user" iconSize="w-[26px] h-[26px]"
                          variant="ghost" size="round" className="rounded-full hover:!bg-black/10" />
        </div>
    </div>
);