import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import Image from "next/image";
import React from "react";

type Props = {
    avatar: string
}
export const ProfileAvatar = ({avatar}:Props) => {
    return (
        <>
            {
                !avatar ?
                    <UserAvatarIcon name="User avatar" aria-label="User avatar icon"
                                    className="w-[200px] h-[200px] text-[#33674E] dark:text-white rounded-[100%] p-10 border border-[#33674E] dark:border-white" /> :
                    <Image src={avatar}
                           alt={"User avatar"} width={200} height={200}
                           className="rounded-[100%] p-10 border border-[#33674E] dark:border-white" />
            }
        </>
    );
};

