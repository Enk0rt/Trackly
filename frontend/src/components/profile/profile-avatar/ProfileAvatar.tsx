import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import Image from "next/image";
import React from "react";

type Props = {
    avatar: string
    className?: string
}
export const ProfileAvatar = ({avatar,className}:Props) => {
    return (
        <>
            {
                !avatar ?
                    <UserAvatarIcon name="User avatar" aria-label="User avatar icon"
                                    className={`rounded-[100%] border ${className}`} /> :
                    <Image src={avatar}
                           alt={"User avatar"} width={200} height={200}
                           className={`rounded-[100%] border ${className}`} />
            }
        </>
    );
};

