"use client";
import Menu from "@/components/menu/Menu";
import React, { useRef } from "react";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import Image from "next/image";

export default function Home() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const baseSkew = "skewX(-25deg) translateZ(0)";

    const handleMouseMove = (e: React.MouseEvent) => {
        const wrap = wrapRef.current;
        const card = cardRef.current;
        if (!wrap || !card) return;

        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = rect.width / 2;
        const cy = rect.height / 2;

        // Обмежуємо амплітуду, щоб рух був м’який
        const max = 10;
        const rotateX = Math.max(-max, Math.min(max, ((y - cy) / cy) * max));
        const rotateY = Math.max(-max, Math.min(max, ((x - cx) / cx) * max));

        card.style.transform = `${baseSkew} rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = baseSkew;
    };

    return (
        <div>
            <header className="pt-[34px]  flex items-center justify-center">
                <div className="w-[84%] max-w-[1249px]">
                    <Menu />
                </div>
            </header>
            <main className='overflow-x-hidden'>
                <div className="mt-4 flex items-center justify-center pl-0 sm:pl-[20px]">
                    <div className="w-[80%] max-w-[1249px] relative md:w-[94%] lg:w-[84%]">
                        <div className="mt-4 sm:mt-0 w-[82%] max-w-[300px] sm:w-[441x] sm:max-w-[441px]">
                            <h1 className="text-[40px] font-bold sm:text-[60px] hidden sm:block">TrackLy -</h1>
                            <h3 className="text-[30px] font-bold sm:text-[40px] text-[#33674E]">Organize</h3>
                            <h3 className="text-[24px] font-bold sm:text-[40px] text-[#33674E]">Yourself Smarter</h3>
                            <h4 className="font-light text-[14px] sm:text-xl text-[#33674E] opacity-60">Stay productive,
                                achieve goals,
                                gain
                                habits and keep your plans in one place</h4>
                        </div>
                        <div className="mt-4 sm:mt-8">
                            <MainBtn text={"Get started for Free"}
                                     className={"bg-[#34684F] text-[#FFFFFF] hover:scale-110 transform-gpu"} />
                            <MainBtn text={"Sign in"}
                                     className="hover:scale-110 text-[#34684F] hover:underline underline-offset-6 transform-gpu" />
                        </div>
                        <h1 className="w-[400px] lg:w-[500px] xl:w-[60%] -z-1  right-0 top-0 text-[122px] lg:text-[162px] xl:text-[241px] text-[#33674E]  drop-shadow-[10px_10px_8px_rgba(51,103,78,100)] opacity-[.10] uppercase font-medium leading-[100px] md:leading-[120px] lg:leading-[160px] xl:leading-[200px] md:text-right xl:text-left
                         hidden
                         absolute
                         md:block ">
                            ready set go
                        </h1>
                    </div>
                </div>
                <div
                    className="w-full max-w-[1649px] pb-20 mx-auto flex flex-col gap-20 lg:flex-row items-center justify-center relative  ">
                    <div
                        className="w-full  h-full mt-2 md:mt-4 flex justify-center items-center lg:block animate-float-mockup">
                        <Image src="/mokup2.png" alt="App Mokup" width={1000} height={1000}
                               className="w-[500px] sm:w-full lg:w-[800px] lg:h-[400px] top-[100px] object-cover
                               mt-8
                               lg:object-fill
                               [perspective:1400px]
                               skew-x-[40deg] skew-y-[-8deg]
                               " />
                    </div>
                    <div
                        ref={wrapRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="
                          right-0 bottom-[50%]
                          lg:absolute
                          [perspective:1000px]
                          animate-float
                          will-change-transform
                          select-none
                        "
                    >

                        <div
                            ref={cardRef}
                            className="
                                px-[30px] py-[24px] m-3 max-w-[441px] rounded-[18px] bg-white shadow-xl
                                lg:skew-x-[-25deg]
                                transition-transform duration-250 ease-out
                                will-change-transform transform-gpu
                              "
                        >

                        <ul className="flex flex-col gap-7">
                            <li>
                                <h3 className="relative pl-8 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:bg-[url('/svg/ui-ico.svg')] before:bg-no-repeat before:bg-contain">
                                    Simple UI
                                </h3>
                                <p className="pl-8">Minimal, distraction-free design helps you focus on what matters</p>
                            </li>
                            <li>
                                <h3 className="relative pl-8 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:bg-[url('/svg/custom-ico.svg')] before:bg-no-repeat before:bg-contain">
                                    Customization
                                </h3>
                                <p className="pl-8">Create your own habits and goals to track your success</p>
                            </li>
                            <li>
                                <h3 className="relative pl-8 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:bg-[url('/svg/chart-ico.svg')] before:bg-no-repeat before:bg-contain">
                                    Progress Tracking
                                </h3>
                                <p className="pl-8">Follow the progress with charts and daily statistics</p>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>

            </main>
            <footer>

            </footer>
        </div>
    );
}
