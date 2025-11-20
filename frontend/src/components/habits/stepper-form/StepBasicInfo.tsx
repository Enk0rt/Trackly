import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FormInput } from "@/components/ui/input/formInput";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";
import { StepControls } from "@/components/habits/stepper-form/StepControls";
import { motion } from "framer-motion";
import Image from "next/image";
import DefaultSelect from "@/components/ui/select/DefaultSelect";
import TextArea from "@/components/ui/input/TextArea";

type Props = {
    step: number,
    setStep: Dispatch<SetStateAction<number>>
    stepDirection: number
    setStepDirection: Dispatch<SetStateAction<number>>
    register: UseFormRegister<HabitValidator>,
    errors: FieldErrors<HabitValidator>,
    setValue: UseFormSetValue<HabitValidator>,
    trigger: UseFormTrigger<HabitValidator>
    getValues: UseFormGetValues<HabitValidator>
}

export const StepBasicInfo: FC<Props> = ({
                                             step,
                                             setStep,
                                             stepDirection,
                                             setStepDirection,
                                             register,
                                             errors,
                                             setValue,
                                             trigger,
                                             getValues
                                         }) => {
    const initialCategoryValue = getValues('category')
    const [categoryValue, setCategoryValue] = useState<string | undefined>(initialCategoryValue as string | undefined);
    const hasErrors = !!errors.title || !!errors.description || !!errors.category;

    useEffect(() => {
        if (categoryValue === undefined) return;
        setValue("category", categoryValue, {
            shouldValidate: true,
            shouldTouch: true,
        });
    }, [categoryValue, setValue]);

    return (
        <motion.div
            initial={stepDirection === 1 ? { left: 200, opacity: 0 } : { left: -200, opacity: 0 }}
            animate={{ left: 0, opacity: 1 }}
            exit={stepDirection === 1 ? { left: -200, opacity: 0 } : { left: -200, opacity: 0 }}
            transition={{ duration: .3 }}
            className="w-[90%] lg:w-[50%] px-6 py-8 relative justify-center flex flex-col gap-5 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] backdrop-blur rounded-[10px] text-[#33674E] dark:text-white">
            <div className="flex justify-between gap-4">
                <form action="" className="grow-1">
                    <h2 className="mb-4 text-3xl font-medium">1. Basic Info</h2>
                    <FormInput labelFor={"title"} labelText={"Title"} type={"text"} id={"title"} register={register}
                               value={"title"} error={errors.title} />
                    <TextArea labelFor={'description'} labelText={"Description"} error={errors.description!} register={register} registerValue={'description'}/>
                    <label>
                        <span className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">
                             Category {errors.category && <span className="text-red-500">*</span>}
                        </span>
                        <DefaultSelect categoryValue={categoryValue} setCategoryValue={setCategoryValue}
                                       error={errors.category} />
                        <div className="text-red-500 text-[12px] mt-1 space-y-1">
                            {errors.category &&
                                <p>{errors.category.message}</p>
                            }
                        </div>
                    </label>
                </form>
                <div
                    className="hidden lg:block w-[320px] h-[300px] aspect-[5/4] relative shrink-0">
                    <Image
                        src="/step-1.png"
                        alt="First step basic info"
                        fill
                    />
                </div>
            </div>
            <StepControls step={step} setStep={setStep} setStepDirection={setStepDirection} hasErrors={hasErrors}
                          trigger={trigger} />
        </motion.div>
    );
};

export default StepBasicInfo;