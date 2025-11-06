import { Dispatch, FC, SetStateAction } from "react";

type Props = {
    setStep: Dispatch<SetStateAction<number>>
}

export const StepInstructions: FC<Props> = ({ setStep }) => {
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
            <div className="flex gap-5 w-full justify-center">
                <div onClick={() => setStep(prev => prev - 1)}>
                    Prev
                </div>
                <div onClick={() => setStep(prev => prev + 1)}>
                    Next
                </div>
            </div>
        </div>
    );
};

export default StepInstructions;
