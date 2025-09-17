import Menu from "@/components/menu/Menu";
import React from "react";
import { ActionButton } from "@/components/ui/action-button/ActionButton";
import AddIcon from "@/components/ui/svg/buttons/AddIcon";

const Page = async () => {
    return (
        <div>
            <header className="pt-[34px]  flex items-center justify-center ">
                <div className="w-[84%] max-w-[1249px]">
                    <Menu />
                </div>
            </header>

            <main className="mt-10 flex justify-center">
                <div className="w-[84%] max-w-[1249px]">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[24px] md:text-[30px] xl:text-[44px] 2xl:text-[50px] text-[#33674E] dark:text-white">Habits</h3>
                        <ActionButton Icon={AddIcon} iconLabel={"Add button icon"} text={"Add Habit"}  />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;