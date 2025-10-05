import React, { FC } from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

type Props = {
    disabledPrev?: boolean
    disabledNext?: boolean
    actionPrev: () => void
    actionNext: () => void,
    page: number
}


const Pagination: FC<Props> = ({ disabledNext, disabledPrev, actionPrev, actionNext,page }) => {
    return (
        <div className=" mt-5 flex justify-center ">
            <div className="flex items-center w-fit gap-10">
                <button disabled={disabledPrev} onClick={actionPrev} className="cursor-pointer">
                    <ArrowLongLeftIcon
                        className={"w-[26px] h-[26px] dark:text-white text-[#33674E] transform transition hover:-translate-x-1"} />
                </button>
                <div
                    className="flex justify-center items-center w-[30px] h-[30px] rounded-[4px] dark:bg-white bg-[#33674E] dark:text-[#33674E] text-white">
                    <p>
                        {page}
                    </p>
                </div>
                <button
                    disabled={disabledNext}
                    onClick={actionNext} className="cursor-pointer">
                    <ArrowLongRightIcon
                        className={`w-[26px] h-[26px] dark:text-white text-[#33674E] transform transition hover:translate-x-1 `} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;