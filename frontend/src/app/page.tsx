import Menu from "@/components/menu/Menu";
import React from "react";
import { MainHero } from "@/components/main-hero/MainHero";


export default function Home() {

    return (
        <div className=''>
            <header className="pt-[34px]  flex items-center justify-center ">
                <div className="w-[84%] max-w-[1249px]">
                    <Menu />
                </div>
            </header>
            <main className="overflow-x-hidden ">
                <MainHero />
            </main>
            <footer>

            </footer>
        </div>
    );
}
