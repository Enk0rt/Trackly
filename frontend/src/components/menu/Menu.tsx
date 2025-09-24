"use client";
import Logo from "@/components/ui/logo/Logo";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { Logout } from "@/components/auth/logout/Logout";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { handleLogout } from "@/components/auth/logout/helpers/handleLogout";
import MenuList from "@/components/menu/MenuList";
import { ProfileButton } from "@/components/ui/buttons/profile-button/ProfileButton";
import { MainBtn } from "../ui/buttons/main-btn/MainBtn";
import { useAuth } from "@/hooks/useAuth";

export const Menu = () => {
    const [active, setActive] = useState<string>("signUp");
    const pathname = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useAuth()


    const hideMenu =
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up") ||
        pathname.startsWith("/recovery") ||
        pathname.startsWith("/confirm") ||
        pathname.startsWith("/verify");


    if (hideMenu) return null;

    if (isLoading) return <div className="h-[111px]"></div>;

    return (
        <div className="py-[24px] flex flex-col sm:flex-row justify-between items-center ">
            <ul className="flex items-center gap-[4px] opacity-0 animate-appear">
                {!user ? (
                    <>
                        <li
                            onMouseEnter={() => setActive("signIn")}
                            onMouseLeave={() => setActive("signUp")}
                        >
                            <MainBtn
                                type={TypeBtnEnum.LINK}
                                path={"/sign-in"}
                                className={`${
                                    active === "signIn"
                                        ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F] shadow-[0_2px_6px_rgba(12,49,44,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)]"
                                        : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F]"
                                }`}
                            >
                                Sign in
                            </MainBtn>
                        </li>
                        <li
                            onMouseEnter={() => setActive("signUp")}
                            onMouseLeave={() => setActive("signUp")}
                        >
                            <MainBtn
                                type={TypeBtnEnum.LINK}
                                path={"/sign-up"}
                                className={`${
                                    active === "signUp"
                                        ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F] shadow-[0_2px_6px_rgba(12,49,44,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)]"
                                        : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F]"
                                }`}
                            >
                                Sign up
                            </MainBtn>
                        </li>
                    </>
                ) : (
                    <MenuList pathname={pathname} />
                )}
            </ul>

            <div className="flex gap-6 items-center opacity-0 animate-opacity">
                {user && <ProfileButton user={user} />}
                <ThemeChanger />
                <Logo />
                {user && (
                    <Logout
                        action={() => handleLogout(queryClient, pathname, router)}
                    />
                )}
            </div>
        </div>
    );
};
