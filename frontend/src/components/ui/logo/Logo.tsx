import Image from "next/image";
import React from "react";

type Props ={
    className?: string
}

export const Logo = ({className}:Props) => {
    return (
        <div className={`flex items-center gap-[8px] sm:mt-0 ${className}`}>
            <Image src="/svg/app-logo.svg" alt="App logo" width={55} height={55} />
            <h1 className='text-[42px] font-bold dark:text-[#FFFFFF]'>TrackLy</h1>
        </div>
    );
};

export default Logo;