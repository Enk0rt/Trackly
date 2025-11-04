import { FC } from "react";
import { IHabitWithChecks } from "@/interfaces/habits/IHabit";

type Props = {
    habit: IHabitWithChecks
}
export const HabitWeekStory: FC<Props> = ({ habit }) => {

    console.log(habit);

    return (
        <div className="pl-10 mt-6 flex items-center gap-6">
            {
                habit.habitChecks.map((item, i) => {
                    console.log(item.day, `item is ${item.isChecked}`);
                    return (
                        <div key={i} className="flex flex-col">
                            <div>{item.day}</div>
                            <div>{`${item.isChecked}`}</div>
                        </div>

                    );

                })
            }
        </div>
    );
};

