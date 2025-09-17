"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import NewOnATrackIcon from "@/components/ui/svg/achievements/NewOnATrackIcon";
import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import { ProfileHeaderIconsList } from "@/components/profile/profile-header/ProfileHeaderIconsList";


export const ProfileHeader = () => {
    const { data: user } = useAuth();

    return (
        <div>
            {
                    <div className="mt-5 flex justify-start gap-7">
                        <div className="flex flex-col items-center gap-[12px] grow-0">
                            {
                                 !user?.avatar ?
                                    <UserAvatarIcon name='User avatar' aria-label='User avatar icon' className='w-[200px] h-[200px] text-[#33674E] dark:text-white rounded-[100%] p-10 border border-[#33674E] dark:border-white'/> :
                                    <Image src={user.avatar}
                                           alt={"User avatar"} width={200} height={200}
                                           className="rounded-[100%] p-10 border border-[#33674E] dark:border-white" />
                            }

                            <p className="text-[#33674E] dark:text-white text-[14px] md:text-[18px] xl:text-[22px]">@{user?.username}</p>

                            <div
                                className="px-[20px] py-[6px] flex items-center w-fit gap-[8px] bg-[#33674E] dark:bg-[#33674E]/40 rounded-[30px]">
                                <NewOnATrackIcon name='New on a track achievement' aria-label='New on a track achievement icon'  className="w-[26px] h-[26px] text-white" />
                                <p className="text-white dark:text-white text-[10px] md:text-[12px] xl:text-[14px]">New
                                    on a track</p>
                            </div>

                            <button className="underline underline-offset-2 text-[#33674E]/50 dark:text-white/50 cursor-pointer">
                                change badge
                            </button>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            <div className="flex gap-2 items-center ">
                                <NewOnATrackIcon name='New on a track achievement' aria-label='New on a track achievement icon' className="w-[40px] h-[40px] text-[#33674E] dark:text-white" />
                                <h4 className="text-[#33674E] dark:text-white text-[24px] md:text-[32px] xl:text-[40px]">{user?.name} {user?.surname}</h4>
                            </div>
                            <p className="text-[#33674E] dark:text-white text-[14px] md:text-[18px] xl:text-[22px]">I
                                create myself with my hands and mind</p>
                            <ProfileHeaderIconsList/>
                        </div>
                    </div>
            }
        </div>
    );
};

