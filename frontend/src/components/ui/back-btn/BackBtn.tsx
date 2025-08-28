"use client"
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export const BackBtn = () => {
    const {theme} = useTheme()
    return (
        <div>
            <Link href='/' className='flex gap-2 items-center cursor-pointer'>
               <span className='hidden sm:block dark:text-[#FFFFFF]'>Back</span>
                <Image src={theme==='dark' ? '/light-theme/svg/back-ico-light.svg' : '/dark-theme/svg/back-ico-dark.svg'} alt='Back button icon' width={30} height={30}/>
            </Link>
        </div>
    );
};

