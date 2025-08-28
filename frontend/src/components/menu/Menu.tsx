"use client";
import React, { useState } from "react";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import Logo from "@/components/ui/logo/Logo";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";

const Menu = () => {
    const [active, setActive] = useState<"signIn" | "signUp">("signUp");

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center">
            <ul className="flex items-center gap-[4px]">
                <li
                    onMouseEnter={() => setActive("signIn")}
                    onMouseLeave={() => setActive("signUp")}
                >
                    <MainBtn
                            type={TypeBtnEnum.LINK}
                            path={'/sign-in'}
                            className={
                            active === "signIn"
                                ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F]"
                                : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F]"
                    }
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
                            path={'/sign-up'}
                            className={
                            active === "signUp"
                                ? "bg-[#34684F] text-white dark:bg-[#FFFFFF] dark:text-[#34684F]"
                                : "hover:bg-[#34684F] text-[#34684F] dark:text-white hover:text-white dark:hover:bg-[#FFFFFF] dark:hover:text-[#34684F]"
                        }
                    >
                        Sign up
                    </MainBtn>
                </li>
            </ul>

            <ThemeChanger/>
            <Logo />
        </div>
    );
};

export default Menu;