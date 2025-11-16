import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import BackIcon from "@/components/ui/svg/buttons/BackIcon";
import NextIcon from "@/components/ui/svg/buttons/NextIcon";
import { FieldErrors } from "react-hook-form";

type Props = {
    step?: number,
    setStep: Dispatch<SetStateAction<number>>
    setStepDirection: Dispatch<SetStateAction<number>>
    errors: FieldErrors
}

export const StepControls: FC<Props> = ({ step, setStep, setStepDirection, errors }) => {
    const router = useRouter();

    const handleBackClick = () => {
        if (step === 1) {
            router.push("/habits");
        } else {
            setStep(prev => prev - 1);
            setStepDirection(-1);
        }
    };

    const handleNextClick = () => {
        setStep(prev => prev + 1);
        setStepDirection(1);
    };

    const hasErrors = Object.keys(errors).length > 0;

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
                          className={hasErrors ? "hover:!bg-[transparent] !cursor-not-allowed" : ""}>
                Next
            </ActionButton>
        </div>
    );
};

