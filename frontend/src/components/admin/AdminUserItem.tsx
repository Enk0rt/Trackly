"use client";
import { IUser } from "@/interfaces/user/IUser";
import ProfileAvatar from "@/components/profile/profile-avatar/ProfileAvatar";
import React, { memo, ReactElement, useState } from "react";
import Link from "next/link";
import CustomCheckbox from "@/components/ui/checkboxes/CustomCheckbox";
import { AnimatePresence } from "framer-motion";
import AdminUserInfoField from "@/components/admin/AdminUserInfoField";
import { capitalize } from "lodash";
import UserRoleSwitchIcon from "@/components/ui/svg/user/UserRoleSwitchIcon";
import { DefaultModal } from "@/components/ui/modals/DefaultModal";
import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import CrownIcon from "@/components/ui/svg/other/CrownIcon";
import { RoleEnum } from "@/enums/roleEnum";

type Props = {
    user: IUser;
    isChooseMode: boolean;
    isSelected: boolean;
    toggleUserSelection: (userId: string) => void;
    activateChooseMode: (userId: string) => void;
    changeRole: (id: string, role: RoleEnum) => void

};

type roleData = {
    label: string
    Icon: ReactElement,
    action: () => void
}

export const AdminUsersItem: React.FC<Props> = ({
                                                    user,
                                                    isChooseMode,
                                                    isSelected,
                                                    toggleUserSelection,
                                                    activateChooseMode,
                                                    changeRole,
                                                }) => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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

    const roleData: roleData[] = [
        {
            label: "Make user",
            Icon: <UserAvatarIcon className="size-10" />,
            action: () => changeRole(user._id, RoleEnum.USER),
        },
        {
            label: "Make admin",
            Icon: <CrownIcon className="size-10" />,
            action: () => changeRole(user._id, RoleEnum.ADMIN),
        },
    ];

    const handleCardClick = () => {
        if (!isChooseMode) {
            activateChooseMode(user._id);
        } else {
            toggleUserSelection(user._id);
        }
    };


    return (
        <>
            <DefaultModal showModal={isOpenModal} setShowModal={setIsOpenModal}>
                <div className="flex flex-col justify-center text-[#33674E] dark:text-white">
                    <h3 className="text-center">Permissions</h3>
                    <div className="mt-4 flex w-full gap-4 items-center justify-center cursor-pointer">
                        {
                            roleData.map(({ Icon, action, label }, index) =>
                                <div key={index} onClick={action} className="w-[30%] p-3 flex flex-col items-center justify-center border-[#33674E] dark:border-white transform will-change-transform
                                 origin-center transition ease-[unset] duration-400 hover:scale-[1.1] hover:bg-[#33674E] dark:hover:bg-white dark:hover:text-[#33674E] dark:hover:border-[#33674E] hover:text-white hover:border-white rounded-[12px]">
                                    <div
                                        className="flex w-fit justify-center items-center p-3 border border-inherit rounded-full">
                                        {Icon}
                                    </div>
                                    <p className="text-center">{label}</p>
                                </div>,
                            )
                        }
                    </div>
                </div>
            </DefaultModal>
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

                <div className=" flex items-center gap-4 min-w-[200px] md:w-[30%]">
                    <ProfileAvatar
                        avatar={user.avatar}
                        role={user.role}
                        size={60}
                        crownColor={"dark:text-[#33674E] text-white"}
                        borderColor={"dark:border-[#33674E] border-white"}
                        textColor={"dark:text-[#33674E] text-white"}
                        className="p-3"
                    />

                    <div className="flex flex-col">
                        <h3 className="text-lg font-medium">{user.username}</h3>
                        <div className="flex gap-2 items-center">
                            <p className="opacity-50">{capitalize(user.role)}</p>
                            <UserRoleSwitchIcon onClick={(e) => {
                                e.stopPropagation();
                                setIsOpenModal(true);
                            }}
                                                className="w-[20px] h-[20px] text-white dark:text-[#33674E] opacity-50 transition hover:opacity-100" />
                        </div>
                        <Link
                            onClick={(e) => e.stopPropagation()}
                            href={`/profile/${user.username}`}
                            className="text-sm opacity-70 hover:opacity-100 transition-opacity ease-[none] will-change-contents"
                        >
                            show profile
                        </Link>
                    </div>
                </div>

                <div
                    className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between lg:items-center md:w-[35%] gap-3 md:gap-4">
                    {userInfo.map((item) => (
                        <AdminUserInfoField key={item.label} label={item.label} value={item.value} />
                    ))}
                </div>

                <div
                    className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between md:w-[35%] gap-3 md:gap-4">
                    {userStatusCheck.map((item) => (
                        <AdminUserInfoField key={item.label} label={item.label} value={item.value} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default memo(AdminUsersItem);
