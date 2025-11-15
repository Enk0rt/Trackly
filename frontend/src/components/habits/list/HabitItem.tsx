import { FC } from "react";
import { IHabitWithChecks } from "@/interfaces/habits/IHabit";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import InfoIcon from "@/components/ui/svg/other/InfoIcon";
import EditIcon from "@/components/ui/svg/buttons/EditIcon";
import { HabitWeekHistory } from "@/components/habits/list/HabitWeekHistory";
import { FireIcon } from "@heroicons/react/24/outline";

type Props = {
    habit: IHabitWithChecks
}

export const HabitItem: FC<Props> = ({ habit }) => {
    return (
        <li
            className="px-8 py-5 -w-1/2 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] bg-white dark:bg-[#33674E] rounded-[18px] dark:text-white">
            <div className="flex items-center gap-3">
                <div
                    className="border-2 border-black/20 dark:border-white/20 flex self-start justify-center items-center p-6 rounded-full">
                    {
                        habit.icon && habit.icon
                    }
                </div>
                <div className="w-screen flex justify-between">
                    <div>
                        <h2>{habit.title}</h2>
                        <h4 className="opacity-50">
                            {
                                habit.frequency.length > 1 ? `${habit.frequency} times per week` : "Once a week"
                            }
                        </h4>
                        <HabitWeekHistory habit={habit} />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-3 self-start">
                            <ActionButton icon={InfoIcon} iconLabel={"Info Button"} iconSize={"w-5 h-5"}
                                          size={"noPadding"}
                                          variant={"ghost"} className="cursor-pointer rounded-full !p-1" />
                            <ActionButton icon={EditIcon} iconPosition={"left"} iconLabel={"Edit Button"}
                                          iconSize={"w-5 h-5"} size={"sm"} variant={"secondary"}
                                          className="cursor-pointer">
                                Edit
                            </ActionButton>
                        </div>
                        <div className='mb-3 flex items-center justify-center flex-col'>
                            <div className="flex gap-2 items-center text-sm lg:text-lg">
                                <p className="text-center">{habit.streak}</p>
                                <FireIcon width={36} height={36} color="#33674E" className='dark:text-white'/>
                            </div>
                            <p className=" text-center">Streak</p>
                        </div>
                    </div>
                </div>
            </div>

        </li>
    );
};

export default HabitItem;