import React, { FC } from "react";
import { IChecks } from "@/interfaces/habits/IHabitChecks";
import { CheckIcon } from "@heroicons/react/24/outline";
import { getDate} from "date-fns";
type Props = {
    week: IChecks
}
export const HabitWeekHistoryItem: FC<Props> = ({ week }) => {
    const currentDay = new Date().toString().slice(0,3)

    return (
        <div className="flex flex-col items-center">
            <div>{week.day}</div>
            <div className='opacity-50'>{getDate(week.date)}</div>
            {
                week.isChecked ?
                        <div className="p-1 mt-1 rounded-full border border-[#33674E]/10 bg-[#33674E] dark:bg-white">
                            <CheckIcon height={16} width={16} color={"white"} className="dark:text-[#33674E]" />
                        </div>
                    :
                    <>
                        {
                            (week.day === currentDay && !week.isChecked) ?
                                <div
                                    className="p-3 mt-1 rounded-full border border-[#33674E]/20 dark:border-white/20 bg-[#33674E] dark:bg-white "></div>
                                :
                                <div
                                    className="p-3 mt-1 rounded-full border border-[#33674E]/20 dark:border-white/20 "></div>
                        }
                    </>

            }
        </div>
    );
};

