"use client";
import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";

type Props = {
    initialMinutesValue: number,
    initialSecondsValue: number,
    setIsTimeRunOut: Dispatch<SetStateAction<boolean>>
}

const Timer: FC<Props> = ({ initialMinutesValue, initialSecondsValue, setIsTimeRunOut }) => {

    const [minutes, setMinutes] = useState<number>(initialMinutesValue);
    const [seconds, setSeconds] = useState<number>(initialSecondsValue);
    const [isTimerReady, setIsTimerReady] = useState<boolean>(false);
    useEffect(() => {
        const storageKey = "passwordRecoveryTimer";

        const savedEndTime = localStorage.getItem(storageKey);
        let endTime: number;

        if (savedEndTime) {
            endTime = parseInt(savedEndTime, 10);
        }

        const interval = setInterval(() => {
            const remaining = Math.max(0, endTime - Date.now());
            const remMinutes = Math.floor(remaining / 1000 / 60);
            const remSeconds = Math.floor((remaining / 1000) % 60);

            setMinutes(remMinutes);
            setSeconds(remSeconds);
            setIsTimerReady(true);

            if (remaining <= 0) {
                clearInterval(interval);
                setIsTimeRunOut(true);
                localStorage.removeItem(storageKey);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [initialMinutesValue, initialSecondsValue, setIsTimeRunOut]);


    return (
        <>
            {
                isTimerReady &&
                <div className="text-[#33674E] dark:text-white text-[14px] sm:text-[18] font-light tracking-[2px]">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
            }
        </>


    );
};

export default memo(Timer);