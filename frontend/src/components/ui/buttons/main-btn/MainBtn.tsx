import React from "react";
import Link from "next/link";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";

type Props = {
    className?: string,
    type: TypeBtnEnum,
    path?: string,
    children: React.ReactNode,
    disabledValue?: boolean,
}

export const MainBtn = ({ className, path, type, children, disabledValue, }: Props) => {

    return (
        <>
            {
                (type === TypeBtnEnum.LINK) && (path) ?
                    (<Link href={path}
                           className={` py-[4px] px-[24px] rounded-[50px] outline-0 border-[0] font-[inherit] text-[10px] sm:text-xl  cursor-pointer transition duration-300 ease-in-out ${className}`}>
                        {children}
                    </Link>) : (

                        <button
                            disabled={disabledValue}
                            className={` py-[4px] px-[24px] rounded-[50px] outline-0 border-[0] font-[inherit] text-[10px] sm:text-xl  cursor-pointer transition duration-300 ease-in-out ${className}`}>
                            {children}
                        </button>
                    )
            }

        </>
    );
};

