"use client";
import Image from "next/image";
import { use3DTilt } from "@/components/ui/benefits-card/hooks/use3DTilt";
import { useTheme } from "next-themes";

export const Mockup = () => {
    const { wrapRef, cardRef, handleMouseLeave, handleMouseMove } = use3DTilt("skew(38deg,-8deg) scale(0.9)");
    const {theme} = useTheme()
    const isMobile =
        typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
    return (
        <div
             className="w-full">
            <div ref={wrapRef}
                 onMouseMove={isMobile ? undefined :handleMouseMove}
                 onMouseLeave={isMobile ? undefined :handleMouseLeave}
                 className='w-fit  mt-2 md:mt-4 flex justify-center items-center lg:block animate-float-mockup  [perspective:800px] will-change-transform'
            >
                <div
                    ref={cardRef}
                    className="
                          relative left-[-100px]
                          h-full
                          skew-x-[38deg] skew-y-[-8deg] scale-[1]
                          transition-transform duration-250 ease-out
                          will-change-transform transform-gpu
                          "
                >
                    <Image src={theme==='dark' ? '/mockup-dark.png' : '/mockup2.png'} alt="App Mokup" width={1000} height={1000}
                           className="w-[600px] sm:w-full lg:w-[800px] lg:h-[400px] object-cover
                               mt-8
                               lg:object-fill

                               " />
                </div>
            </div>
        </div>
    );
};