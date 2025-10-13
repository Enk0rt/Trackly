import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, FC, memo, SetStateAction, useMemo, useState } from "react";
import { debounce } from "lodash";

type Props = {
    pageSize: number,
    setPageSize: Dispatch<SetStateAction<number>>
}

const AdminPanelSettings:FC<Props> = ({ pageSize, setPageSize }) => {
    const [inputVal, setInputVal] = useState<number>(pageSize);

    const debouncedChanger = useMemo(
        () => debounce((val: number) => {
            setPageSize(val);
        }, 500),
        [setPageSize],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if(val <=0){
            setInputVal(1)
        }else setInputVal(val);
        debouncedChanger(val);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl text-[#33674E] dark:text-white">Settings</h3>
            <div className="flex items-center gap-2">
                <h4 className="text-xl text-[#33674E] dark:text-white">Users per page</h4>
                <div className="flex items-center gap-2">
                    <button
                        disabled={pageSize <= 1}
                        onClick={() => {
                            setInputVal((prev) => Math.max(1, prev - 1))
                            setPageSize((prev) => Math.max(1, prev - 1));
                        }}
                    >
                        <MinusCircleIcon className="w-[24px] h-[24px] cursor-pointer text-[#33674E] dark:text-white" />
                    </button>

                    <input
                        type="number"
                        name="user-count"
                        min={1}
                        value={inputVal}
                        onChange={(e) => handleChange(e)}
                        className=" border border-[#33674E] w-[36px] text-center dark:border-white [outline:none!important] p-1 bg-transparent rounded-[4px] text-[#33674E] dark:text-white
                                    [appearance:textfield]
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none
                                    [&::-moz-appearance]:textfield"
                    />

                    <button onClick={() => {
                        setInputVal((prev) => Math.max(1, prev + 1))
                        setPageSize((prev) => Math.max(1, prev + 1));
                    }}>
                        <PlusCircleIcon className="w-[24px] h-[24px] cursor-pointer text-[#33674E] dark:text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(AdminPanelSettings)