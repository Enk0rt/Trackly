import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type Props = {
    step?: number,
    setStep: Dispatch<SetStateAction<number>>
}

export const StepControls: FC<Props> = ({ step, setStep }) => {
    const router =useRouter()
    return (
        <div className="flex gap-5 w-full justify-center">
            <>
                {
                    step === 0 ? <>
                            <div onClick={() => router.push('/habits')}>
                                Back
                            </div>
                            <div onClick={() => setStep(prev => prev + 1)}>
                                Start
                            </div>
                        </> :
                        <>
                            <div onClick={() => setStep(prev => prev - 1)}>
                                Prev
                            </div>
                            <div onClick={() => setStep(prev => prev + 1)}>
                                Next
                            </div>
                        </>
                }
            </>
        </div>
    );
};

