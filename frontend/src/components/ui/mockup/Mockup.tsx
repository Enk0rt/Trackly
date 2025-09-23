"use client";
import Image from "next/image";
import { use3DTilt } from "@/components/ui/benefits-card/hooks/use3DTilt";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export const Mockup = () => {
    const { wrapRef, cardRef, handleMouseLeave, handleMouseMove } = use3DTilt("skew(38deg,-8deg) scale(0.9)");
    const {resolvedTheme} = useTheme()
    const [mounted, setMounted] = useState<boolean>(false);
    const src = useMemo(():string => {
        switch (resolvedTheme) {
            case 'light':
             return '/mockup2.png'
            case 'dark':
                return '/mockup-dark.png'
            default:
                return '/mockup2.png'
        }
    }, [resolvedTheme]);

    useEffect(() => {
        setMounted(true)
    }, []);


    const isMobile =
        typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
    return (
        <div
             className="w-full min-h-[20vh] ">
            <div ref={wrapRef}
                 onMouseMove={isMobile ? undefined :handleMouseMove}
                 onMouseLeave={isMobile ? undefined :handleMouseLeave}
                 className='w-fit  mt-2 md:mt-4 flex justify-center items-center lg:block animate-float-mockup  [perspective:800px] will-change-transform'
            >
                {
                    !mounted ? null : <div
                        ref={cardRef}
                        className="
                          opacity-0
                          animate-opacity
                          relative left-[-100px]
                          h-full
                          skew-x-[38deg] skew-y-[-8deg] scale-[1]
                          transition-transform duration-250 ease-out
                          will-change-transform transform-gpu

                          "
                    >
                        <Image key='mockup' src={src} alt="App Mokup" width={1000} height={1000}
                               className="w-[600px] sm:w-full lg:w-[800px] lg:h-[400px] object-cover
                               mt-8
                               lg:object-fill"
                        />
                    </div>
                }
            </div>
        </div>
    );
};