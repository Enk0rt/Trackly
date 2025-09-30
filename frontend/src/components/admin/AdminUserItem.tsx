"use client";
import { IUser } from "@/interfaces/user/IUser";
import { ProfileAvatar } from "@/components/profile/profile-avatar/ProfileAvatar";
import React from "react";
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
            className={`relative px-[30px] py-[24px] dark:bg-white bg-[#33674E]
                rounded-[10px] flex dark:text-[#33674E] text-white
                items-center gap-4 cursor-pointer transition transform will-change-transform origin-center hover:scale-[1.05] ${isSelected ? "opacity-80" : "opacity-100"}`}>

            <AnimatePresence>
                <CustomCheckbox user={user} isChooseMode={isChooseMode} isSelected={isSelected}
                                toggleUserSelection={toggleUserSelection} />
            </AnimatePresence>

            <div className="flex gap-4 min-w-[300px] items-center">
                <ProfileAvatar
                    avatar={user.avatar}
                    className="w-[60px] h-[60px] p-3 text-white dark:text-[#33674E] border-white dark:border-[#33674E]"
                />
                <div>
                    <h3 className="text-[18px]">{user.username}</h3>
                    <Link onClick={(e) => {
                        e.stopPropagation();
                    }} href={`/profile/${user.username}`}
                          className="transition ease-[unset] opacity-50 hover:opacity-100">
                        show profile
                    </Link>
                </div>
            </div>

            <div className="flex justify-between self-start grow-1">
                {
                    userInfo.map((item)=>
                        <AdminUserInfoField key={item.label} label={item.label} value={item.value}/>
                    )
                }
            </div>

        </div>
    );
};

export default React.memo(AdminUsersItem);
