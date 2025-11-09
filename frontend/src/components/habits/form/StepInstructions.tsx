import { Dispatch, FC, SetStateAction } from "react";
import { StepControls } from "@/components/habits/form/StepControls";

type Props = {
    step:number
    setStep: Dispatch<SetStateAction<number>>
}

export const StepInstructions: FC<Props> = ({step, setStep }) => {
    return (
        <div className="px-6 py-8 flex flex-col gap-5 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] backdrop-blur  rounded-[10px] text-[#33674E] dark:text-white">
            <h2 className='text-3xl font-medium'>Habit Constructor</h2>
            <h3 className='text-2xl text-center'>Tutorial</h3>
            <p className='text-lg text-center'>Follow this 5 steps in order to get dream habit and tones of profit from it</p>
            <div className="flex flex-wrap justify-center items-center gap-10">
                <p>1. Basic info</p>

                <p>2. Habit Target </p>

                <p>3. Habit Icon </p>

                <p>4. Reminders & Frequency </p>

                <p>5. Check and Approve</p>
            </div>
            <div className='text-center'> Don`t show tutorial again</div>
            <StepControls step={step} setStep={setStep}/>
        </div>
    );
};

export default StepInstructions;
