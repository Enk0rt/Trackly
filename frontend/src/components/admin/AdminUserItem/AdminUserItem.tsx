"use client";

import { IUser } from "@/interfaces/user/IUser";
import { FC, memo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { capitalize } from "lodash";
import ProfileAvatar from "@/components/profile/profile-avatar/ProfileAvatar";
import CustomCheckbox from "@/components/ui/checkboxes/CustomCheckbox";
import UserRoleSwitchIcon from "@/components/ui/svg/user/UserRoleSwitchIcon";
import { RoleEnum } from "@/enums/roleEnum";
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal";
import { UserRoleModal } from "@/components/admin/AdminUserItem/UserRoleModal";
import { UserInfoGroup } from "@/components/admin/AdminUserItem/UserInfoGroup";

type Props = {
    user: IUser;
    isChooseMode: boolean;
    isSelected: boolean;
    toggleUserSelection: (userId: string) => void;
    activateChooseMode: (userId: string) => void;
    changeRole: (id: string, role: RoleEnum) => void;
};

const AdminUsersItem: FC<Props> = ({
                                             user,
                                             isChooseMode,
                                             isSelected,
                                             toggleUserSelection,
                                             activateChooseMode,
                                             changeRole,
                                         }) => {
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

    const handleConfirm = () => {
        if (pendingAction) pendingAction();
        setIsConfirmOpen(false);
    };

    const handleCardClick = () => {
        if (!isChooseMode) activateChooseMode(user._id);
        else toggleUserSelection(user._id);
    };

    return (
        <>
            <ConfirmModal
                show={isConfirmOpen}
                title="Confirm role change"
                message="Are you sure you want to make this user an admin?"
                confirmLabel="Yes, change"
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
                onCancel={() => setIsConfirmOpen(false)}
            />

            <UserRoleModal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                user={user}
                changeRole={changeRole}
                onCritical={(action) => {
                    setPendingAction(() => action);
                    setIsConfirmOpen(true);
                }}
            />

            <div
                onClick={handleCardClick}
                className={`relative px-6 py-5 dark:bg-white bg-[#33674E] rounded-[10px]
          flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10
          dark:text-[#33674E] text-white cursor-pointer transition hover:scale-[1.02]
          ${isSelected ? "opacity-80" : "opacity-100"}`}
            >
                <AnimatePresence>
                    <CustomCheckbox
                        user={user}
                        isChooseMode={isChooseMode}
                        isSelected={isSelected}
                        toggleUserSelection={toggleUserSelection}
                    />
                </AnimatePresence>

                <div className="flex items-center gap-4 min-w-[200px] md:w-[30%]">
                    <ProfileAvatar
                        avatar={user.avatar}
                        role={user.role}
                        size={60}
                        crownColor="dark:text-[#33674E] text-white"
                        borderColor="dark:border-[#33674E] border-white"
                        textColor="dark:text-[#33674E] text-white"
                        className="p-3"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-lg font-medium">{user.username}</h3>
                        <div className="flex gap-2 items-center">
                            <p className="opacity-50">{capitalize(user.role)}</p>

                            <UserRoleSwitchIcon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRoleModalOpen(true);
                                }}
                                className="w-[20px] h-[20px] text-white dark:text-[#33674E] opacity-50 hover:opacity-100 transition"
                            />

                        </div>
                        <Link
                            href={`/profile/${user.username}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                        >
                            show profile
                        </Link>
                    </div>
                </div>

                <UserInfoGroup
                    items={[
                        { label: "Habits", value: user.habits.length },
                        { label: "Goals", value: user.habits.length },
                        { label: "Planner efficiency", value: "Temporary unavailable" },
                    ]}
                />

                <UserInfoGroup
                    items={[
                        { label: "Email", value: user.isVerified ? "Verified" : "Not verified" },
                        { label: "Status", value: user.isBlocked ? "Restricted" : "Active" },
                        { label: "In use", value: user.isDeleted ? "Deleted" : "Active" },
                    ]}
                />
            </div>
        </>
    );
};

export default memo(AdminUsersItem);
