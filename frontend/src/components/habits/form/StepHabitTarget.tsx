import { Dispatch, FC, SetStateAction } from "react";
import { FormInput } from "@/components/ui/input/formInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";
import { StepControls } from "@/components/habits/form/StepControls";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
    step: number,
    setStep: Dispatch<SetStateAction<number>>
    stepDirection: number,
    setStepDirection: Dispatch<SetStateAction<number>>
    register: UseFormRegister<HabitValidator>,
    errors: FieldErrors<HabitValidator>,
}

export const StepHabitTarget: FC<Props> = ({ step, setStep, stepDirection, setStepDirection, register, errors }) => {
    return (
        <motion.div
            initial={stepDirection === 1 ? { left: 200, opacity: 0 } : { left: -200, opacity: 0 }}
            animate={{ left: 0, opacity: 1 }}
            exit={stepDirection === 1 ? { left: 200, opacity: 0 } : { left: -200, opacity: 0 }}
            transition={{ duration: .3 }}
            className="w-[90%] lg:w-[50%] px-6 py-8 absolute transform translate-x-[50%] mx-auto border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] backdrop-blur rounded-[10px] text-[#33674E] dark:text-white">
            <div className="flex justify-between gap-4">
                <form action="" className="grow-1">
                    <h2 className="text-3xl font-medium">2. Habit Target</h2>
                    <FormInput labelFor={"target"} labelText={"Target per day"} type={"text"} id={"target"}
                               register={register}
                               value={"targetValue"} error={errors.targetValue} />
                    <FormInput labelFor={"target-unit"} labelText={"Value Unit"} type={"text"} id={"target-unit"}
                               register={register}
                               value={"targetUnit"} error={errors.targetUnit} />
                    <FormInput labelFor={"deadline"} labelText={"Deadline"} type={"text"} id={"deadline"}
                               register={register}
                               value={"deadline"} error={errors.deadline} />
                </form>
                <Image src={"/step-2.png"} alt={"First step basic info"} width={300} height={300} className='w-[300px] h-[300px]' />
            </div>
            <StepControls step={step} setStep={setStep} setStepDirection={setStepDirection} errors={errors} />
        </motion.div>
    );
};

export default StepHabitTarget;