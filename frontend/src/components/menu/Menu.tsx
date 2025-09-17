"use client";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import Logo from "@/components/ui/logo/Logo";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { Logout } from "@/components/auth/logout/Logout";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { links } from "@/components/menu/data/links";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { handleLogout } from "@/components/auth/logout/helpers/handleLogout";

const Menu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [active, setActive] = useState<string>("signUp");
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!user ? (
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <ul className="flex items-center gap-[4px]">
                        <li
                            onMouseEnter={() => setActive("signIn")}
                            onMouseLeave={() => setActive("signUp")}
                        >
                            <MainBtn
                                type={TypeBtnEnum.LINK}
                                path={"/sign-in"}
                                className={`${
                                    active === "signIn" ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F] shadow-[0_2px_16px_rgba(12,49,44,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)]   hover:dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] " : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F] "
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
                                    active === "signUp" ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F] shadow-[0_2px_16px_rgba(12,49,44,10)]    dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] hover:dark:shadow-[0px_2px_6px_rgba(255,255,255,40)]" : "hover:bg-[#34684F]  text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F] "
                                }`}
                            >
                                Sign up
                            </MainBtn>
                        </li>
                    </ul>

                    <div className="flex gap-6 items-center">
                        <ThemeChanger />
                        <Logo />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <ul className="flex items-center gap-[4px]">
                        {links.map((link) => (
                            <li key={link.path}>
                                <MainBtn
                                    type={TypeBtnEnum.LINK}
                                    path={link.path}
                                    className={`${
                                        pathname === link.path
                                            ? "bg-[#34684F] text-white dark:bg-white dark:text-[#34684F] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] shadow-[0_2px_16px_rgba(12,49,44,10)] hover:dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] hover:shadow-[0_2px_16px_rgba(12,49,44,10)]"
                                            : " hover:bg-[#34684F] hover:text-white text-[#34684F] dark:text-white dark:hover:bg-white dark:hover:text-[#34684F] hover:dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] hover:shadow-[0_2px_16px_rgba(12,49,44,10)]"
                                    }`}
                                >
                                    {link.label}
                                </MainBtn>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-6 items-center">
                        <div
                            className="rounded-[100%] w-[34px] h-[34px] border border-[#0C312C] dark:border-[#ffffff] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.1] will-change-transform origin-center">
                            {
                                !user.avatar ?
                                    <Link href={`/profile/${user.username}`}>
                                        < Image src="/light-theme/svg/user-icon-light.svg" alt="User icon" width={18}
                                                height={18} className="block dark:hidden" />
                                        < Image src="/dark-theme/svg/user-icon-dark.svg" alt="User icon" width={18}
                                                height={18} className="hidden dark:block" />
                                    </Link> :

                                    <Link href={`/profile/${user.username}`}>
                                        < Image src={user.avatar} alt="User icon" width={18}
                                                height={18} className="hidden dark:block" />
                                    </Link>
                            }
                        </div>
                        <ThemeChanger />
                        <Logo />
                        <Logout action={() => handleLogout(queryClient, pathname, router)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;
