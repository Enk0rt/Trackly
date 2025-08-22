import Image from "next/image";
import React from "react";

export const Logo = () => {
    return (
        <div className="flex items-center gap-[8px] mt-4 sm:mt-0">
            <Image src="/svg/app-logo.svg" alt="App logo" width={55} height={55} />
            <h1 className='text-[42px] font-bold'>TrackLy</h1>
        </div>
    );
};

export default Logo;