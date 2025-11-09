"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StepInstructions from "@/components/habits/form/StepInstructions";
import StepBasicInfo from "@/components/habits/form/StepBasicInfo";
import { habitValidation, HabitValidator } from "@/validators/habitValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import StepHabitTarget from "@/components/habits/form/StepHabitTarget";

export const Stepper = () => {
    const [step, setStep] = useState<number>(0);
    const {
        reset,
        register,
        formState: { errors },
        setError,
    } = useForm<HabitValidator>({ resolver: zodResolver(habitValidation), mode: "onBlur" });

    return (
        <div className="w-[84%] max-w-[1249px]">
            {step === 0 && <StepInstructions step={step} setStep={setStep} />}
            {step === 1 && <StepBasicInfo step={step} setStep={setStep} register={register} errors={errors} />}
            {step === 2 && <StepHabitTarget step={step} setStep={setStep} register={register} errors={errors} />}
        </div>
    );
};

