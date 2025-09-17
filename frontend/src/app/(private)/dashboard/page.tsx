import Menu from "@/components/menu/Menu";
import React from "react";

const Page =async () => {


    return (
        <div>
            <header className="pt-[34px]  flex items-center justify-center ">
                <div className="w-[84%] max-w-[1249px]">
                    <Menu />
                </div>
            </header>
            Dashboard
        </div>
    );
};

export default Page;