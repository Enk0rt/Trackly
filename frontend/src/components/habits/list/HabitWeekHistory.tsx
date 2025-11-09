import { FC } from "react";
import { IHabitWithChecks } from "@/interfaces/habits/IHabit";
import { HabitWeekHistoryItem } from "@/components/habits/list/HabitWeekHistoryItem";
import dayjs from "dayjs";
import { getDate } from "date-fns";

type Props = {
    habit: IHabitWithChecks
}
export const HabitWeekHistory: FC<Props> = ({ habit }) => {
    const currentMonth = dayjs().toDate().toString().split(" ")[1];
    const currentDay = getDate(dayjs().toString());
    return (
        <div className="mt-6 flex gap-8 items-center ">

            <div className='py-1 px-3 rounded-[8px] text-white bg-[#33674E] flex flex-col items-center text-sm lg:text-xl'>
                <p>{currentMonth}</p>
                <p>{currentDay}</p>
            </div>
            <div className="flex items-center gap-6">
                {
                    habit.habitChecks.map((item, i) => <HabitWeekHistoryItem key={i} week={item} />)
                }
            </div>
        </div>
    );
};

