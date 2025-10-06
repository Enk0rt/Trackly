import { IUser } from "@/interfaces/user/IUser";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "@/components/profile/profile-avatar/ProfileAvatar";

type Props = {
    user: IUser
}
export const ProfileButton = ({ user }: Props) => {
    return (
        <div
            className=" cursor-pointer transition-all duration-300 ease-in-out will-change-transform transform hover:scale-[1.2] origin-center">
            {!user.avatar ? (
                <Link href={`/profile/${user.username}`}>
                    <ProfileAvatar avatar={user.avatar}
                                   role={user.role}
                                   size={40}
                                   borderColor={"dark:border-white border-[#33674E] dark:text-white text-[#33674E]"} textColor={"dark:border-white border-[#33674E]"} className='p-2'/>
                </Link>
            ) : (
                <Link href={`/profile/${user.username}`}>
                    <Image
                        src={user.avatar}
                        alt="User icon"
                        width={18}
                        height={18}
                        className="hidden dark:block"
                    />
                </Link>
            )}
        </div>
    );
};

