"use client"
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const BackBtn = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <div>
            <Link href='/' className='flex gap-2 items-center cursor-pointer'>
                <span className='hidden sm:block dark:text-[#FFFFFF]'>Back</span>
                {
                    !mounted ? <div className="h-[20px] w-[20px]" /> : <Image
                        src={resolvedTheme === 'dark' ? '/light-theme/svg/back-ico-light.svg' : '/dark-theme/svg/back-ico-dark.svg'}
                        alt='Back button icon' width={30} height={30} />
                }
            </Link>
        </div>
    );
};

