import React from "react";
import AddIcon from "@/components/ui/svg/buttons/AddIcon";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import { HabitsList } from "@/components/habits/list/HabitsList";
import Link from "next/link";
import dayjs from "dayjs";
import { getDate } from "date-fns";

const HabitsPage = async () => {

    const currentMonth = dayjs().toDate().toString().split(" ")[1];
    const currentDay = getDate(dayjs().toString());
    return (
        <div className="mt-10 flex justify-center">
            <div className="w-[84%] max-w-[1249px]">
                <div className="flex justify-between items-center">
                    <div className='flex gap-4 items-center'>
                        <h3 className="text-[24px] md:text-[30px] xl:text-[44px] 2xl:text-[50px] text-[#33674E] dark:text-white">Habits</h3>
                        <div
                            className="py-1 px-3 rounded-[8px] text-white dark:text-[#33674E] bg-[#33674E] dark:bg-white flex flex-col items-center text-sm lg:text-lg">
                            <p>{currentMonth} {currentDay}</p>
                        </div>
                    </div>
                    <Link href={"/habits/create-habit"}>
                        <ActionButton icon={AddIcon} iconLabel={"Add button icon"} iconPosition={"left"}
                                      variant={"secondary"} size={"lg"}>
                            Add habit
                        </ActionButton>
                    </Link>
                </div>

                <div>
                    <HabitsList/>
                </div>
            </div>
        </div>

    );
};

export default HabitsPage;