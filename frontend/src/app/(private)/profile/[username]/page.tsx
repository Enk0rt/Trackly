import React from "react";
import { Profile } from "@/components/profile/Profile";
import { getData } from "@/services/api/getData";

type Props = {
    params: { username: string }
}

const ProfilePage = async ({ params }: Props) => {

    const { username } = await params;

    const user = await getData.getUserByUsername(username);

    return (
        <div className="mt-10 flex justify-center">
            <Profile user={user} />
        </div>

    );
};

export default ProfilePage;