"use client";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import Logo from "@/components/ui/logo/Logo";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { Logout } from "@/components/auth/logout/Logout";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { links } from "@/components/menu/data/links";
import { logout } from "@/services/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const Menu = () => {
    const pathname = usePathname();
    const [active, setActive] = useState<string>("signUp");
    const {data:user,isLoading} = useAuth()
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await logout();
        await queryClient.setQueryData(["me"], null);
    };

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
                                        active === "signIn" ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F]" : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F]"
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
                                        active === "signUp" ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F]" : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F]"
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
                                                ? "bg-[#34684F] text-white dark:bg-white dark:text-[#34684F]"
                                                : "hover:bg-[#34684F] hover:text-white text-[#34684F] dark:text-white dark:hover:bg-white dark:hover:text-[#34684F]"
                                        }`}
                                    >
                                        {link.label}
                                    </MainBtn>
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-6 items-center">
                            <ThemeChanger />
                            <Logo />
                            <Logout action={handleLogout} />
                        </div>
                    </div>
                )}
            </>
        );
    };

export default Menu;
