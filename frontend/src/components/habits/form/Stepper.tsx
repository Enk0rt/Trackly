'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import StepInstructions from "@/components/habits/form/StepInstructions";
import StepBasicInfo from "@/components/habits/form/StepBasicInfo";

export const Stepper = () => {
    const [step, setStep] = useState<number>(0);
    const { reset, register, formState, setError } = useForm<{title:string,description:string}>();

    return (
        <div className='w-[84%] max-w-[1249px]'>
            {step===0 && <StepInstructions setStep={setStep}/>}
            {step===1 && <StepBasicInfo setStep={setStep} register={register}/>}
        </div>
    );
};

