"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StepBasicInfo from "@/components/habits/stepper-form/StepBasicInfo";
import { habitValidation, HabitValidator } from "@/validators/habitValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import StepHabitTarget from "@/components/habits/stepper-form/StepHabitTarget";
import { AnimatePresence } from "framer-motion";
import StepperStatusBar from "@/components/habits/stepper-form/StepperStatusBar";

export const Stepper = () => {
    const [step, setStep] = useState<number>(1);
    const [stepDirection, setStepDirection] = useState<number>(1);
    const totalSteps = 5
    const {
        register,
        formState: { errors },
        setValue,
        getValues,
        trigger
    } = useForm<HabitValidator>({ resolver: zodResolver(habitValidation), mode: "onBlur"   });


    return (
        <div className="w-[84%] max-w-[1249px] flex flex-col justify-center items-center">
            <StepperStatusBar step={step} totalSteps={totalSteps} />
            <AnimatePresence key={1} mode={"wait"}>
                {step === 1 &&
                    <StepBasicInfo key={1} step={step} setStep={setStep} stepDirection={stepDirection}
                                   setStepDirection={setStepDirection} register={register} errors={errors} setValue={setValue} trigger={trigger} getValues={getValues}/>
                }
                {step === 2 &&
                    <StepHabitTarget key={2} step={step} setStep={setStep} stepDirection={stepDirection}
                                     setStepDirection={setStepDirection} register={register} errors={errors} trigger={trigger} />
                }
            </AnimatePresence>
        </div>
    );
};

