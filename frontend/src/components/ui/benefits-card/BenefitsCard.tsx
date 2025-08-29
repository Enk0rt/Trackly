"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { use3DTilt } from "@/components/ui/benefits-card/hooks/use3DTilt";
import { benefits } from "@/data/benefitsCardData";
import { useTheme } from "next-themes";


export const BenefitsCard = () => {
    const { wrapRef, cardRef, handleMouseLeave, handleMouseMove } = use3DTilt("skewX(-25deg) translateZ(0) ");
    const [mounted, setMounted] = useState<boolean>(false);
    const {theme} = useTheme();

    const isMobile =
        typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return null

    return (
        <div
            ref={wrapRef}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            className="right-0 lg:bottom-[20%] xl:bottom-[50%]
                      lg:absolute
                      [perspective:1000px]
                      animate-float
                      will-change-transform
                      select-none
                    "
        >
            <div
                ref={cardRef}
                className="px-[30px] py-[24px] m-3 max-w-[381px] lg:max-w-[441px] rounded-[18px]  shadow-xl
                          lg:skew-x-[-25deg]
                          transition-transform duration-250 ease-out
                          will-change-transform transform-gpu
                          bg-white dark:bg-[#34684F]
                          dark:text-[#FFFFFF]
                        "
            >
                <ul className="flex flex-col justify-center  gap-7">
                    {
                        benefits.map((item, i) => <li key={i}>
                            <div className="flex items-center">
                                <Image
                                    src={theme === "dark" ? `/light-theme/svg/${item.icon}-light.svg` : `/dark-theme/svg/${item.icon}-dark.svg`}
                                    alt={"Benefit icon"} width={24} height={24} />
                                <h3 className={`relative pl-4 text-[16px] sm:text-[18px]`}>
                                    {item.title}
                                </h3>
                            </div>
                            <p className="pl-10 text-[12px] sm:text-[14px]">{item.text}</p>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default BenefitsCard;