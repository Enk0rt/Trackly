import React from "react";

type Props = {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    iconLabel: string;
    text: string;
    className?: string;
}

export const ActionButton = ({ Icon, iconLabel, text,className}: Props) => {
    return (
        <button
            className={`px-[54px] py-[4px] flex items-center justify-center gap-[10px] rounded-[14px] border border-[#418865] dark:border-white text-[14px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] h-fit text-[#33674E] dark:text-white cursor-pointer hover:bg-[#33674E] hover:dark:bg-white hover:text-white hover:dark:text-[#33674E] transition duration-200 ease-[unset] ${className}`}>
            <Icon  role='img'
                   aria-label={iconLabel}
                   className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] xl:w-[24px] xl:h-[24px] hidden dark:block  " />

            <Icon  role='img'
                   aria-label={iconLabel}
                   className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] xl:w-[24px] xl:h-[24px] block dark:hidden " />
            {text}
        </button>
    );
};

