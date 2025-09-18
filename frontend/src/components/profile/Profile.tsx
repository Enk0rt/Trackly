
import { ProfileHeader } from "@/components/profile/profile-header/ProfileHeader";
import React from "react";
import { IUser } from "@/interfaces/user/IUser";

type Props = {
    user:IUser | null
}

export const Profile = async ({user }: Props) => {
    return (
        <>
            {
                !user ?
                    <div className="h-[50vh] my-auto flex items-center justify-center dark:text-white">
                        <div>Seems like user is not found :(</div>
                    </div>
                    :
                    <div className="w-[84%] max-w-[1249px]">
                        <ProfileHeader user={user} />
                    </div>
            }
        </>
    );
};

