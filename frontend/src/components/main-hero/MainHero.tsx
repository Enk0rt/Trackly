import { Mockup } from "@/components/ui/mockup/Mockup";
import BenefitsCard from "@/components/ui/benefits-card/BenefitsCard";
import React from "react";
import { MainHeroButtons } from "@/components/main-hero/MainHeroButtons";

export const MainHero = () => {
    return (
        <div className='overflow-hidden'>
            <div className="mt-4 flex items-center justify-center pl-0 sm:pl-[20px]">
                <div className="w-[80%] max-w-[1249px] relative md:w-[94%] lg:w-[84%]">
                    <div className="mt-4 sm:mt-0 w-[82%] max-w-[300px] sm:w-[441x] sm:max-w-[441px]">
                        <h1 className="text-[40px] font-bold sm:text-[60px] hidden sm:block dark:text-[#FFFFFF]/90">TrackLy -</h1>
                        <h3 className="text-[30px] font-bold sm:text-[40px] text-[#33674E] dark:sm:text-[#0C312C] dark:text-white/80">Organize</h3>
                        <h3 className="text-[24px] font-bold sm:text-[40px] text-[#33674E] dark:sm:text-[#0C312C] dark:text-white/80">Yourself Smarter</h3>
                        <h4 className="font-light text-[14px] sm:text-xl text-[#33674E] dark:text-[#FFFFFF]/30 opacity-60">Stay productive,
                            achieve goals,
                            gain
                            habits and keep your plans in one place</h4>
                    </div>
                    <MainHeroButtons/>
                    <h1 className="w-[400px] lg:w-[500px] xl:w-[60%] -z-1  right-0 top-0 text-[122px] lg:text-[162px] xl:text-[241px] opacity-[.10] uppercase font-medium leading-[100px] md:leading-[120px] lg:leading-[160px] xl:leading-[200px] md:text-right xl:text-left
                         hidden md:block
                         absolute
                         text-[#33674E] dark:text-[#418865]
                         drop-shadow-[10px_10px_8px_black] dark:drop-shadow-[10px_10px_8px_black]
                         ">
                        ready set go
                    </h1>
                </div>
            </div>
            <div
                className="w-full mt-10 max-w-[1649px] pb-30 mx-auto flex flex-col gap-20 lg:flex-row items-center justify-center relative  ">
                <Mockup />
                <BenefitsCard />
            </div>
        </div>
    );
};

