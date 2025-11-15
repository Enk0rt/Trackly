"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StepBasicInfo from "@/components/habits/form/StepBasicInfo";
import { habitValidation, HabitValidator } from "@/validators/habitValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import StepHabitTarget from "@/components/habits/form/StepHabitTarget";
import { AnimatePresence } from "framer-motion";

export const Stepper = () => {
    const [step, setStep] = useState<number>(1);
    const [stepDirection, setStepDirection] = useState<number>(1);
    const {
        reset,
        register,
        formState: { errors },
        setError,
    } = useForm<HabitValidator>({ resolver: zodResolver(habitValidation), mode: "onBlur" });

    return (
        <div className="w-[84%] max-w-[1249px] flex justify-center relative">
            <AnimatePresence key={1} mode={"wait"}>
                {step === 1 &&
                    <StepBasicInfo step={step} setStep={setStep} stepDirection={stepDirection}
                                   setStepDirection={setStepDirection} register={register} errors={errors} />
                }
                {step === 2 &&
                    <StepHabitTarget key={2} step={step} setStep={setStep} stepDirection={stepDirection}
                                     setStepDirection={setStepDirection} register={register} errors={errors} />
                }
            </AnimatePresence>
        </div>
    );
};

