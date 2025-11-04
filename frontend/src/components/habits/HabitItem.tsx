import { FC } from "react";
import { IHabitWithChecks } from "@/interfaces/habits/IHabit";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import InfoIcon from "@/components/ui/svg/other/InfoIcon";
import EditIcon from "@/components/ui/svg/buttons/EditIcon";
import { HabitWeekStory } from "@/components/habits/HabitWeekStory";

type Props = {
    habit: IHabitWithChecks
}

export const HabitItem: FC<Props> = ({ habit }) => {
    return (
        <div
            className="px-8 py-5 -w-1/2 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] bg-white rounded-[18px]">
            <div className="flex items-center gap-3">
                <div className="border-2 border-black/20 flex self-start justify-center items-center p-3 rounded-full">
                    {
                        habit.icon && habit.icon
                    }
                </div>
                <div className='w-screen flex justify-between'>
                    <div>
                        <h2>{habit.title}</h2>
                        <h4 className="opacity-50">
                            {
                                habit.frequency.length > 1 ? `${habit.frequency} times per week` : "Once a week"
                            }
                        </h4>
                    </div>
                    <div className='flex items-center gap-3'>
                        <ActionButton icon={InfoIcon} iconLabel={"Info Button"} iconSize={"w-5 h-5"} size={"noPadding"}
                                      variant={'ghost'} className='cursor-pointer dark:!text-[#33674E]' />
                        <ActionButton icon={EditIcon} iconPosition={'left'} iconLabel={"Edit Button"}
                                      iconSize={"w-5 h-5"} size={"sm"} variant={'secondary'} className='cursor-pointer'>
                            Edit
                        </ActionButton>
                    </div>
                </div>
            </div>
            <HabitWeekStory habit={habit}/>
        </div>
    );
};

export default HabitItem;