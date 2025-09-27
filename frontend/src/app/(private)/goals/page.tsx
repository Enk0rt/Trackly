import React from "react";
import AddIcon from "@/components/ui/svg/buttons/AddIcon";
import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";

const Page = () => {
    return (
        <div className='mt-10 flex justify-center'>
            <div className="w-[84%] max-w-[1249px]">
                <div className="flex justify-between items-center">
                    <h3 className="text-[24px] md:text-[30px] xl:text-[44px] 2xl:text-[50px] text-[#33674E] dark:text-white">Goals</h3>
                    <ActionButton icon={AddIcon} iconLabel={"Add button icon"} iconPosition={"left"} variant={"secondary"} size={'lg'}>
                        Add goal
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};

export default Page;