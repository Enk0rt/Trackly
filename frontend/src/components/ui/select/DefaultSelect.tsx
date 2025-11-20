import { Dispatch, FC, memo, SetStateAction, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FieldErrors } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";

type Props = {
    categoryValue: string | undefined,
    setCategoryValue: Dispatch<SetStateAction<string | undefined>>
    error?: FieldErrors<Partial<HabitValidator>>
}
const DefaultSelect: FC<Props> = ({ categoryValue, setCategoryValue, error }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectOptions = [
        { option: "Mindfulness", value: "mindfulness" },
        { option: "Health", value: "health" },
        { option: "Education", value: "education" },
        { option: "Social", value: "social" },
        { option: "Finance", value: "finance" },
    ];

    const handleSelect = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        setCategoryValue(value);
        setIsActive(false);
    };

    useClickOutside(containerRef, () => setIsActive(false), isActive);

    return (
        <>
            <div
                ref={containerRef}
                onClick={() => setIsActive((prev) => !prev)}
                className={`
                            mt-2 w-full relative rounded-[8px] cursor-pointer text-[#33674E] dark:text-white
                            border
                            ${
                                error
                                    ? "border-red-500 focus-within:!border-[#34684F]/50 dark:focus-within:border-[#FFFFFF]/50"
                                    : "border-[#33674E] dark:border-white/60 focus-within:border-[#34684F]/60 dark:focus-within:border-[#FFFFFF]"
                            }
                            ${isActive ? "!border-[#34684F]/50 dark:border-white" : ""}
                            `}
            >
                <div className="px-4 py-2 flex gap-5 justify-between items-center ">
                    <h3 className="opacity-50 tracking-[1px] text-sm lg:text-md">
                        {!categoryValue
                            ? "Choose category"
                            : (categoryValue === "mindfulness" && "Mindfulness") ||
                            (categoryValue === "health" && "Health") ||
                            (categoryValue === "education" && "Education") ||
                            (categoryValue === "social" && "Social") ||
                            (categoryValue === "finance" && "Finance")}
                    </h3>
                    <div className="flex gap-2">
                        <ChevronDownIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsActive((prev) => !prev);
                            }}
                            className={`w-[18px] h-[18px] text-[#33674E] dark:text-white cursor-pointer transition ${
                                isActive ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </div>
                </div>
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            key="overlay"
                            initial={{ translateY: 10, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: 10, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-2 origin-top w-full absolute z-[5] text-sm dark:bg-[#33674E]/50 bg-white/50 rounded-[8px] backdrop-blur-[8px]"
                        >
                            {selectOptions.map((item, i) => (
                                <p
                                    key={i}
                                    onClick={(e) => handleSelect(e, item.value)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-[#33674E]/30 hover:dark:bg-white/10 ${
                                        i === 0 ? "rounded-t-[8px]" : ""
                                    } ${i === selectOptions.length - 1 ? "rounded-b-[8px]" : ""}`}
                                >
                                    {item.option}
                                </p>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default memo(DefaultSelect);