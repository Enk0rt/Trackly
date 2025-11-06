import { Dispatch, FC, SetStateAction } from "react";
import { FormInput } from "@/components/ui/input/formInput";
import { UseFormRegister } from "react-hook-form";

type Props = {
    setStep: Dispatch<SetStateAction<number>>
    register: UseFormRegister<{ title: string,description:string }>
}
export const StepBasicInfo: FC<Props> = ({ setStep,register }) => {
    return (
        <div
            className="px-6 py-8 flex flex-col gap-5 border border-black/10 shadow-[0_4px_10px_rgba(12,49,44,.08)] backdrop-blur rounded-[10px] text-[#33674E] dark:text-white">
            <h2 className="text-3xl font-medium">Step 1. Basic Info</h2>

            <FormInput labelFor={"title"} labelText={"Title"} type={"text"} id={"title"} register={register}
                       value={"title"} />
            <FormInput labelFor={"description"} labelText={"Description"} type={"text"} id={"description"} register={register}
                       value={"description"} />
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

export default StepBasicInfo;