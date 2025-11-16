import { Dispatch, FC, SetStateAction } from "react";
import { FormInput } from "@/components/ui/input/formInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";
import { StepControls } from "@/components/habits/stepper-form/StepControls";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
    step: number,
    setStep: Dispatch<SetStateAction<number>>
    stepDirection: number
    setStepDirection: Dispatch<SetStateAction<number>>
    register: UseFormRegister<HabitValidator>,
    errors: FieldErrors<HabitValidator>,
}

export const StepBasicInfo: FC<Props> = ({ step, setStep, stepDirection, setStepDirection, register, errors }) => {
    return (
        <motion.div
            initial={stepDirection === 1 ? { left: 200, opacity: 0 } :{ left: -200, opacity: 0 } }
            animate={{ left: 0, opacity: 1 }}
            exit={stepDirection === 1 ? { left: -200, opacity: 0 } :{ left: -200, opacity: 0 }}
            transition={{ duration: .3 }}
            className="w-[90%] lg:w-[50%] px-6 py-8 relative justify-center flex flex-col gap-5 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] backdrop-blur rounded-[10px] text-[#33674E] dark:text-white">
            <div className="flex justify-between gap-4">
                <form action="" className="grow-1">
                    <h2 className="mb-4 text-3xl font-medium">1. Basic Info</h2>
                    <FormInput labelFor={"title"} labelText={"Title"} type={"text"} id={"title"} register={register}
                               value={"title"} error={errors.title} />
                    <FormInput labelFor={"description"} labelText={"Description"} type={"text"} id={"description"}
                               register={register}
                               value={"description"} error={errors.description} />
                </form>
                <Image src={"/step-1.png"} alt={"First step basic info"} width={300} height={300} />
            </div>
            <StepControls step={step} setStep={setStep} setStepDirection={setStepDirection} errors={errors} />
        </motion.div>
    );
};

export default StepBasicInfo;