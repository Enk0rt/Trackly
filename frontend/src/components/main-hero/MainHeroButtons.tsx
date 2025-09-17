"use client"
import { useAuth } from "@/hooks/useAuth";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import React from "react";

export const MainHeroButtons = () => {

    const {data:user} = useAuth()

    return (
        <>
            {!user && <div className="mt-4 sm:mt-8">
                <MainBtn
                    type={TypeBtnEnum.LINK}
                    path={'/sign-up'}
                    className={"bg-[#34684F] text-[#FFFFFF] hover:scale-110 transform-gpu hover:drop-shadow-[0px_2px_6px_rgba(12,49,44,40)] hover:shadow-[inset_0_2px_16px_rgba(12,49,44,10)] hover:dark:shadow-[0px_2px_16px_rgba(255,255,255,40)]"}>
                    Get started for Free
                </MainBtn>

                <MainBtn
                    type={TypeBtnEnum.LINK}
                    path={'/sign-in'}
                    className="hover:scale-110 text-[#34684F] dark:text-white hover:underline underline-offset-6 transform-gpu">
                    Sign in
                </MainBtn>
            </div>}
        </>
    );
};

