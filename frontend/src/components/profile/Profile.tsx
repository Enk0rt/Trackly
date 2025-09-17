import { ActionButton } from "@/components/ui/action-button/ActionButton";
import EditIcon from "@/components/ui/svg/buttons/EditIcon";
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
                    </div> :

                    <div className="w-[84%] max-w-[1249px]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[24px] md:text-[30px] xl:text-[44px] 2xl:text-[50px] text-[#33674E] dark:text-white">Profile</h3>
                            <ActionButton Icon={EditIcon} iconLabel={"Edit button icon"} text={"Edit profile"} />
                        </div>

                        <ProfileHeader />
                    </div>
            }
        </>
    );
};

