"use client";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import React from "react";
import { MainBtn } from "@/components/ui/buttons/main-btn/MainBtn";
import { useAuth } from "@/hooks/useAuth";

export const MainHeroButtons = () => {

    const { data: user, isLoading } = useAuth();

    return (
        <>
            {!user && !isLoading &&
                <div className="mt-4 sm:mt-8 flex gap-5 items-center">
                    <MainBtn
                        type={TypeBtnEnum.LINK}
                        path={"/sign-up"}
                        className="block w-fit bg-[#34684F] text-[#FFFFFF]  hover:shadow-[0px_2px_4px_rgba(12,49,44,40)] hover:translate-y-[-4px] transform hover:dark:shadow-[0px_2px_4px_rgba(255,255,255,40)]"
                    >
                        Get started for Free
                    </MainBtn>

                    <MainBtn
                        type={TypeBtnEnum.LINK}
                        path={"/sign-in"}
                        className="hover:scale-110 text-[#34684F] dark:text-white hover:underline underline-offset-6 will-change-transform origin-center transform-gpu">
                        Sign in
                    </MainBtn>
                </div>}
        </>
    );
};

