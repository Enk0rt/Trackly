"use client";

import BackIcon from "@/components/ui/svg/buttons/BackIcon";
import Link from "next/link";

export const BackBtn = () => {
    return (
        <Link
            href={'/'}
            className="flex gap-2 items-center cursor-pointer"
        >
            <span className="hidden sm:block dark:text-[#FFFFFF]">Back</span>
            <BackIcon className="w-[24px] h-[24px] text-[#34684F] dark:text-white" />
        </Link>
    );
};