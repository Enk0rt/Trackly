import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import BackIcon from "@/components/ui/svg/buttons/BackIcon";
import NextIcon from "@/components/ui/svg/buttons/NextIcon";
import { FieldPath, UseFormTrigger } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";

type Props = {
    step?: number,
    setStep: Dispatch<SetStateAction<number>>
    setStepDirection: Dispatch<SetStateAction<number>>
    hasErrors: boolean,
    trigger: UseFormTrigger<HabitValidator>
}

export const StepControls: FC<Props> = ({ step, setStep, setStepDirection, hasErrors, trigger }) => {
    const router = useRouter();
    const handleBackClick = () => {
        if (step === 1) {
            router.push("/habits");
        } else {
            setStep(prev => prev - 1);
            setStepDirection(-1);
        }
    };

    const checkValidationAndGoForward = async (fields:FieldPath<Partial<HabitValidator>>[]) => {
        const isValidStep = await trigger(fields);
        if (!isValidStep) return;

        setStep((prev) => prev + 1);
        setStepDirection(1);
        return
    }
    const handleNextClick = async () => {
        switch (step) {
            case 1 :
                await checkValidationAndGoForward(["title", "description", "category"])
                break
            case 2:
                await checkValidationAndGoForward(["targetValue", "targetUnit", "deadline"])
                break
            case 4:
                await checkValidationAndGoForward(["frequency","time"])

        }
    };

    return (
        <div className="flex gap-5 w-full justify-end">
            <ActionButton icon={BackIcon} iconPosition={"left"} iconSize={"w-[20px] h-[20px]"}
                          iconLabel={"Next step button"} size={"sm"} variant={"ghost"}
                          onClick={handleBackClick} className="rounded-[10px] hover:text-white">
                Back
            </ActionButton>

            <ActionButton icon={NextIcon} iconPosition={"right"} iconSize={"w-[18px] h-[18px]"}
                          iconLabel={"Next step button"} size={"sm"} variant={hasErrors ? "ghost" : "secondary"}
                          onClick={handleNextClick}
                          disabled={hasErrors}
                          className={hasErrors ? "hover:!bg-[transparent] !cursor-not-allowed" : "!rounded-[10px]"}>
                Next
            </ActionButton>
        </div>
    );
};

