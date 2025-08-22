"use client";
import React, { useState } from "react";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import Logo from "@/components/ui/logo/Logo";

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
                        text="Sign in"
                        className={
                            active === "signIn"
                                ? "bg-[#34684F] text-[#FFFFFF]"
                                : "hover:bg-[#34684F] hover:text-white"
                        }
                    />
                </li>
                <li
                    onMouseEnter={() => setActive("signUp")}
                    onMouseLeave={() => setActive("signUp")}
                >
                    <MainBtn
                        text="Sign up"
                        className={
                            active === "signUp"
                                ? "bg-[#34684F] text-white"
                                : "hover:bg-[#34684F] hover:text-white"
                        }
                    />
                </li>
            </ul>
            <Logo />
        </div>
    );
};

export default Menu;