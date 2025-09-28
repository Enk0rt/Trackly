"use client";

import { useAuth } from "@/hooks/useAuth";
import NewOnATrackIcon from "@/components/ui/svg/achievements/NewOnATrackIcon";
import {
    ProfileHeaderPointsList,
} from "@/components/profile/profile-header/ProfileHeaderIconsList";
import { IUser } from "@/interfaces/user/IUser";
import EditIcon from "@/components/ui/svg/buttons/EditIcon";
import React from "react";
import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import { ProfileAvatar } from "@/components/profile/profile-avatar/ProfileAvatar";

type Props = {
    user: IUser

}

export const ProfileHeader = ({ user }: Props) => {
    const { data: currentUser } = useAuth();

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-[24px] md:text-[30px] xl:text-[44px] 2xl:text-[50px] text-[#33674E] dark:text-white">Profile</h3>

                {
                    user.username === currentUser?.username &&
                    <ActionButton icon={EditIcon} iconLabel={"Edit button icon"} iconPosition={"left"} variant={"secondary"} size={"lg"}>
                        Edit profile
                    </ActionButton>
                }

            </div>
            {
                <div className="mt-5 flex justify-start gap-7">
                    <div className="flex flex-col items-center gap-[12px] grow-0">
                        <ProfileAvatar avatar={user?.avatar}
                                       className={"p-10 w-[200px] h-[200px] text-[#33674E] dark:text-white border-[#33674E] dark:border-white"} />

                        <p className="text-[#33674E] dark:text-white text-[14px] md:text-[18px] xl:text-[22px]">@{user?.username}</p>

                        <div
                            className="px-[20px] py-[6px] flex items-center w-fit gap-[8px] bg-[#33674E]  rounded-[30px]">
                            <NewOnATrackIcon name="New on a track achievement"
                                             aria-label="New on a track achievement icon"
                                             className="w-[26px] h-[26px] text-white" />
                            <p className="text-white dark:text-white text-[10px] md:text-[12px] xl:text-[14px]">New
                                on a track</p>
                        </div>

                        <button
                            className="underline underline-offset-2 text-[#33674E] opacity-50 dark:text-white cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-100">
                            change badge
                        </button>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex gap-2 items-center ">
                            <NewOnATrackIcon name="New on a track achievement"
                                             aria-label="New on a track achievement icon"
                                             className="w-[40px] h-[40px] text-[#33674E] dark:text-white" />
                            {
                                !user.name && !user.surname ?
                                    <h4 className="text-[#33674E] dark:text-white text-[24px] md:text-[32px] xl:text-[40px]">{user?.username}</h4>
                                    :
                                    <h4 className="text-[#33674E] dark:text-white text-[24px] md:text-[32px] xl:text-[40px]">{user?.name} {user?.surname}</h4>
                            }
                        </div>
                        <p className="text-[#33674E] dark:text-white text-[14px] md:text-[18px] xl:text-[22px]">I
                            create myself with my hands and mind</p>
                        <ProfileHeaderPointsList user={user} />
                    </div>
                </div>
            }
        </div>
    );
};

