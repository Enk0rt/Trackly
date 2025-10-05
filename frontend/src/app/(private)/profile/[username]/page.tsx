import { Profile } from "@/components/profile/Profile";
import { getDataFromServer } from "@/services/api/getDataFromServer";

type Props = {
    params: Promise<{ username: string }>;
}

const ProfilePage = async ({ params }: Props) => {
    const { username } = await params;

    const user = await getDataFromServer.getUserByUsername(username);

    return (
        <div className="mt-10 flex justify-center">
            <Profile user={user} />
        </div>
    );
};

export default ProfilePage;