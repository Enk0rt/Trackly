import Image from "next/image";
import React, { FC, memo } from "react";
import UserAvatarIcon from "@/components/ui/svg/user/UserAvatarIcon";
import CrownIcon from "@/components/ui/svg/other/CrownIcon";
import { RoleEnum } from "@/enums/roleEnum";

type Props = {
    avatar?: string;
    role?: string;
    size?: number;
    borderColor?: string;
    textColor?: string;
    className?: string;
    showCrown?: boolean;
    crownColor?: string;
};

const ProfileAvatar: FC<Props> = ({
                                      avatar,
                                      role = "user",
                                      size = 60,
                                      borderColor = "white",
                                      textColor = "white",
                                      className = "",
                                      showCrown,
                                      crownColor = "dark:text-white text-[#33674E]",
                                  }) => {
    const isCrownVisible = showCrown ?? (role === RoleEnum.ADMIN);

    return (
        <div
            className={`relative flex items-center justify-center`}
            style={{ width: size, height: size }}
        >
            {isCrownVisible && (
                <CrownIcon
                    className={`absolute z-10 ${crownColor}`}
                    style={{
                        top: -size * 0.25,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: size * 0.4,
                        height: size * 0.4,
                    }}
                />
            )}

            <div
                className={`relative rounded-full overflow-hidden border ${borderColor} ${textColor} rounded-full ${className}`}
                style={role === RoleEnum.ADMIN ? {
                    width: size,
                    height: size,
                    WebkitMaskImage:
                        "radial-gradient(circle at 50% -20%, transparent 26%, black 27%)",
                    maskImage:
                        "radial-gradient(circle at 50% -20%, transparent 26%, black 27%)",
                    WebkitMaskComposite: "source-in",
                    maskComposite: "intersect",
                } : {}}
            >
                {!avatar ? (
                    <UserAvatarIcon
                        aria-label="User avatar icon"
                        className={`w-full h-full object-cover text-inherit`}
                    />
                ) : (
                    <Image
                        src={avatar}
                        alt="User avatar"
                        width={size * 0.4}
                        height={size * 0.4}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    );
};

export default memo(ProfileAvatar);