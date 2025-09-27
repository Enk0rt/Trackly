"use client";
import { IUser } from "@/interfaces/user/IUser";
import { ProfileAvatar } from "@/components/profile/profile-avatar/ProfileAvatar";
import CheckboxIcon from "@/components/ui/svg/checkbox/CheckboxIcon";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

type Props = {
    user: IUser;
    isChooseMode: boolean;
    isChosen: IUser[];
    toggleUserSelection: (user: IUser) => void;
    activateChooseModeWith: (u: IUser) => void;
};

const AdminUsersItem: React.FC<Props> = ({
                                             user,
                                             isChooseMode,
                                             isChosen,
                                             toggleUserSelection,
                                             activateChooseModeWith,
                                         }) => {
    const isSelected = isChosen.some((u) => u._id === user._id);

    const handleCardClick = () => {
        if (!isChooseMode) {
            activateChooseModeWith(user);
        } else {
            toggleUserSelection(user);
        }
    };


    return (
        <div
            onClick={handleCardClick}
            className={`relative px-[30px] py-[24px] dark:bg-white bg-[#33674E]
                rounded-[10px] flex dark:text-[#33674E] text-white
                items-center gap-4 cursor-pointer transition ${isSelected ? "opacity-80" : "opacity-100"}`}
        >
            {isChooseMode && (

                <motion.div
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: !isChooseMode ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleUserSelection(user);
                    }}
                    role={"checkbox"}
                    aria-label={"User selection checkbox"}
                    className="absolute left-[-40px] w-[24px] h-[24px] flex justify-center items-center overflow-hidden rounded-[4px]"
                >
                    <CheckboxIcon className="w-full h-full text-[#33674E] dark:text-white" />

                    <motion.div
                        animate={{
                            scale: isSelected ? 0 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute w-[40px] h-[40px] dark:bg-white bg-[#33674E] rounded-full"
                    />
                </motion.div>
            )}

            <div className="flex gap-4 min-w-[300px] items-center">
                <ProfileAvatar
                    avatar={user.avatar}
                    className="w-[60px] h-[60px] p-3 text-white dark:text-[#33674E] border-white dark:border-[#33674E]"
                />
                <div>
                    <h3 className="text-[18px]">{user.username}</h3>
                    <Link onClick={(e) => {
                        e.stopPropagation();
                    }} href={`/profile/${user.username}`} className="transition opacity-50 hover:opacity-100">
                        show profile
                    </Link>
                </div>
            </div>

            <div className="flex justify-between self-start grow-1">
                <div>
                    <h3 className="text-[18px]">Habits</h3>
                    <p className="opacity-50">{user.habits.length}</p>
                </div>

                <div>
                    <h3 className="text-[18px]">Goals</h3>
                    <p className="opacity-50">{user.habits.length}</p>
                </div>

                <div>
                    <h3 className="text-[18px]">Planner efficiency</h3>
                    <p className="opacity-50">Temporary unavailable</p>
                </div>
                <div>
                    <h3 className="text-[18px]">Email</h3>
                    <p className="opacity-50">{user.isVerified ? "Verified" : "Not verified"}</p>
                </div>
                <div>
                    <h3 className="text-[18px]">Status</h3>
                    <p className="opacity-50">{user.isBlocked ? "Restricted" : "Active"}</p>
                </div>
                <div>
                    <h3 className="text-[18px]">In use</h3>
                    <p className="opacity-50">{user.isDeleted ? "Deleted" : "Active"}</p>
                </div>
            </div>

        </div>
    );
};

export default React.memo(AdminUsersItem);
