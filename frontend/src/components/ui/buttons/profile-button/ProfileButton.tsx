import { IUser } from "@/interfaces/user/IUser";
import Link from "next/link";
import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import Image from "next/image";

type Props = {
    user: IUser
}
export const ProfileButton = ({ user }: Props) => {
    return (
        <div
            className="rounded-full w-[34px] h-[34px] border border-[#0C312C] dark:border-[#ffffff] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.1]">
            {!user.avatar ? (
                <Link href={`/profile/${user.username}`}>
                    <UserAvatarIcon className="w-[18px] h-[18px] text-[#34684F] dark:text-white" />
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

