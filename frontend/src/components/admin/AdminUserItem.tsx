"use client";
import { IUser } from "@/interfaces/user/IUser";
import ProfileAvatar from "@/components/profile/profile-avatar/ProfileAvatar";
import React, { memo } from "react";
import Link from "next/link";
import CustomCheckbox from "@/components/ui/checkboxes/CustomCheckbox";
import { AnimatePresence } from "framer-motion";
import AdminUserInfoField from "@/components/admin/AdminUserInfoField";

type Props = {
    user: IUser;
    isChooseMode: boolean;
    isSelected: boolean;
    toggleUserSelection: (userId: string) => void;
    activateChooseMode: (userId: string) => void;
};

export const AdminUsersItem: React.FC<Props> = ({
                                                    user,
                                                    isChooseMode,
                                                    isSelected,
                                                    toggleUserSelection,
                                                    activateChooseMode,
                                                }) => {
    const userInfo = [
        { label: "Habits", value: user.habits.length },
        { label: "Goals", value: user.habits.length },
        { label: "Planner efficiency", value: "Temporary unavailable" },
    ];

    const userStatusCheck = [
        { label: "Email", value: user.isVerified ? "Verified" : "Not verified" },
        { label: "Status", value: user.isBlocked ? "Restricted" : "Active" },
        { label: "In use", value: user.isDeleted ? "Deleted" : "Active" },
    ];

    const handleCardClick = () => {
        if (!isChooseMode) {
            activateChooseMode(user._id);
        } else {
            toggleUserSelection(user._id);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className={`relative px-6 py-5 dark:bg-white bg-[#33674E] rounded-[10px]
          flex flex-col md:flex-row md:items-center md:justify-between
          gap-6 md:gap-10 dark:text-[#33674E] text-white cursor-pointer transition
          transform will-change-transform origin-center hover:scale-[1.02]
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
                    className="p-3 w-[60px] h-[60px] border-1 border-white dark:border-[#33674E]"
                />
                <div className="flex flex-col">
                    <h3 className="text-lg font-medium">{user.username}</h3>
                    <Link
                        onClick={(e) => e.stopPropagation()}
                        href={`/profile/${user.username}`}
                        className="text-sm opacity-70 hover:opacity-100 transition-opacity ease-[none] will-change-contents"
                    >
                        show profile
                    </Link>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between lg:items-center md:w-[35%] gap-3 md:gap-4">
                {userInfo.map((item) => (
                    <AdminUserInfoField key={item.label} label={item.label} value={item.value} />
                ))}
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between md:w-[35%] gap-3 md:gap-4">
                {userStatusCheck.map((item) => (
                    <AdminUserInfoField key={item.label} label={item.label} value={item.value} />
                ))}
            </div>
        </div>
    );
};

export default memo(AdminUsersItem);
