"use client";
import React, { memo, useEffect, useState } from "react";
import BenefitCardList from "@/components/ui/benefits-card/BenefutCardList";
import { use3DTilt } from "@/hooks/use3DTilt";


const BenefitsCard = () => {
    const { wrapRef, cardRef, handleMouseLeave, handleMouseMove } = use3DTilt("skewX(-25deg) translateZ(0) ");
    const [mounted, setMounted] = useState<boolean>(false);

    const isMobile =
        typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return null

    return (
        <div className='right-0 lg:bottom-[20%] xl:bottom-[50%]
                      opacity-0  animate-opacity
                      lg:absolute'>
            <div
                ref={wrapRef}
                onMouseMove={isMobile ? undefined : handleMouseMove}
                onMouseLeave={isMobile ? undefined : handleMouseLeave}
                className="
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
                    <BenefitCardList />
                </div>
            </div>
        </div>
    );
};

export default memo(BenefitsCard);