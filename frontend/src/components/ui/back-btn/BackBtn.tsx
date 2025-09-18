"use client";

import { useRouter } from "next/navigation";
import BackIcon from "@/components/ui/svg/buttons/BackIcon";

export const BackBtn = () => {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <button
            onClick={handleBack}
            className="flex gap-2 items-center cursor-pointer"
        >
            <span className="hidden sm:block dark:text-[#FFFFFF]">Back</span>
            <BackIcon className="w-[24px] h-[24px] text-[#34684F] dark:text-white" />
        </button>
    );
};