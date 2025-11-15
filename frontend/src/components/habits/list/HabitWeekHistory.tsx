import { FC } from "react";
import { IHabitWithChecks } from "@/interfaces/habits/IHabit";
import { HabitWeekHistoryItem } from "@/components/habits/list/HabitWeekHistoryItem";


type Props = {
    habit: IHabitWithChecks
}
export const HabitWeekHistory: FC<Props> = ({ habit }) => {

    return (
        <div className="mt-4 flex gap-4 items-center  ">
            <div className="flex items-center gap-6">
                {
                    habit.habitChecks.map((item, i) => <HabitWeekHistoryItem key={i} week={item} />)
                }
            </div>
        </div>
    );
};

