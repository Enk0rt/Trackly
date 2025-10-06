"use client";
import { DefaultModal } from "@/components/ui/modals/DefaultModal";
import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import CrownIcon from "@/components/ui/svg/other/CrownIcon";
import { RoleEnum } from "@/enums/roleEnum";
import { IUser } from "@/interfaces/user/IUser";
import React from "react";
import { RoleChangeButton } from "@/components/admin/AdminUserItem/UserChangeButton";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    user: IUser;
    changeRole: (id: string, role: RoleEnum) => void;
    onCritical: (action: () => void) => void;
};

export const UserRoleModal: React.FC<Props> = ({
                                                   isOpen,
                                                   onClose,
                                                   user,
                                                   changeRole,
                                                   onCritical,
                                               }) => {
    const roles = [
        {
            label: "Make user",
            icon: <UserAvatarIcon className="size-10" />,
            role: RoleEnum.USER,
            critical: false,
        },
        {
            label: "Make admin",
            icon: <CrownIcon className="size-10" />,
            role: RoleEnum.ADMIN,
            critical: true,
        },
    ];

    return (
        <DefaultModal showModal={isOpen} setShowModal={onClose}>
            <div className="flex flex-col justify-center text-[#33674E] dark:text-white">
                <h3 className="text-center text-lg font-medium">Permissions</h3>
                <div className="mt-4 flex w-full gap-4 items-center justify-center">
                    {roles.map(({ label, icon, role, critical }) => {
                        const disabled = user.role === role;
                        const handleClick = () =>
                            critical
                                ? onCritical(() => changeRole(user._id, role))
                                : changeRole(user._id, role);

                        return (
                            <RoleChangeButton
                                key={label}
                                label={label}
                                icon={icon}
                                disabled={disabled}
                                onClick={handleClick}
                            />
                        );
                    })}
                </div>
            </div>
        </DefaultModal>
    );
};
