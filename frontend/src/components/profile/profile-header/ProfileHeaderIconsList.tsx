import AchievementIcon from "@/components/ui/svg/achievements/AchievementIcon";
import HabitIcon from "@/components/ui/svg/habits/HabitIcon";
import GoalIcon from "@/components/ui/svg/goals/GoalIcon";

export const ProfileHeaderIconsList = () => {
    return (
        <ul className="mt-2 flex gap-7">
            <li className="flex gap-2 items-center text-[14px] md:text-[18px] xl:text-[22px] text-[#33674E] dark:text-white">
                <AchievementIcon name='Achievement' aria-label='Achievement icon'
                                 className="w-[40px] h-[40px] text-[#33674E] dark:text-white" />
                <p>No achievements yet </p>
            </li>
            <li className="flex gap-2 items-center text-[14px] md:text-[18px] xl:text-[22px] text-[#33674E] dark:text-white">
                <HabitIcon name='Habit' aria-label='Habit icon'
                           className="w-[40px] h-[40px] text-[#33674E] dark:text-white" />

                <p>Habits gained: 10</p>
            </li>
            <li className="flex gap-2 items-center text-[14px] md:text-[18px] xl:text-[22px] text-[#33674E] dark:text-white">
                <GoalIcon name='Goal' aria-label='Goal icon'
                          className="w-[40px] h-[40px] text-[#33674E] dark:text-white" />

                <p>Goals achieved: 2</p>
            </li>
        </ul>
    );
};

