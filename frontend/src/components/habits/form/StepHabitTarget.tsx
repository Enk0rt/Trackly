import { Dispatch, FC, SetStateAction } from "react";
import { FormInput } from "@/components/ui/input/formInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";
import { StepControls } from "@/components/habits/form/StepControls";

type Props = {
    step:number,
    setStep: Dispatch<SetStateAction<number>>
    register: UseFormRegister<HabitValidator>,
    errors: FieldErrors<HabitValidator>,
}

export const StepHabitTarget: FC<Props> = ({ step,setStep, register,errors }) => {
    return (
        <div
            className="px-6 py-8 flex flex-col gap-5 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] backdrop-blur rounded-[10px] text-[#33674E] dark:text-white">
            <h2 className="text-3xl font-medium">Step 1. Basic Info</h2>
            <FormInput labelFor={"target"} labelText={"Target per day"} type={"text"} id={"target"} register={register}
                       value={"targetValue"} error={errors.targetValue} />
            <FormInput labelFor={"target-unit"} labelText={"Value Unit"} type={"text"} id={"target-unit"}
                       register={register}
                       value={"targetUnit"} error={errors.targetUnit} />
            <FormInput labelFor={"deadline"} labelText={"Deadline"} type={"text"} id={"deadline"}
                       register={register}
                       value={"deadline"} error={errors.deadline} />
          <StepControls step={step} setStep={setStep}/>
        </div>
    );
};

export default StepHabitTarget;