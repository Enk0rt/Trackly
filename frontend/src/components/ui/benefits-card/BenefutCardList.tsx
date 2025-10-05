import { benefits } from "@/data/benefitsCardData";
import React, { memo } from "react";

const BenefitCardList = () => {
    return (
        <ul className="flex flex-col justify-center  gap-7">
            {
                benefits.map((benefit, i) => {

                    const Icon = benefit.icon

                    return <li key={i}>
                        <div className="flex items-center">
                            <Icon name={benefit.text} aria-label={benefit.iconLabel}
                                  className='w-[24px] h-[24px] text-[#34684F] dark:text-white' />
                            <h3 className={`relative pl-4 text-[16px] sm:text-[18px]`}>
                                {benefit.title}
                            </h3>
                        </div>
                        <p className="pl-10 text-[12px] sm:text-[14px]">{benefit.text}</p>
                    </li>
                })
            }
        </ul>
    );
};

export default memo(BenefitCardList)
