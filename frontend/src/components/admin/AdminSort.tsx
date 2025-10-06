import { Dispatch, FC, memo, SetStateAction, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import ClearIcon from "@/components/ui/svg/other/ClearIcon";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";
import { useClickOutside } from "@/hooks/useClickOutside";

type Props = {
    sortValue: string | undefined;
    setSortValue: Dispatch<SetStateAction<string | undefined>>;
    setPage: Dispatch<SetStateAction<number>>;
};

const AdminSort:FC<Props> = ({ setSortValue, sortValue, setPage }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectOptions = [
        { option: "Sort by name", value: "name" },
        { option: "Sort by username", value: "username" },
        { option: "Sort by email", value: "email" },
        { option: "Sort by age", value: "age" },
        { option: "Sort by role", value: "role" },
    ];

    const handleSelect = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        setSortValue(value);
        setPage(1);
        setIsActive(false);
    };

    useClickOutside(containerRef, () => setIsActive(false), isActive);


    return (
        <div
            ref={containerRef}
            onClick={() => setIsActive((prev) => !prev)}
            className="relative bg-[#33674E]/5 dark:bg-white/5 text-[#33674E] dark:text-white rounded-[8px] cursor-pointer"
        >
            <div className="px-4 py-2 flex gap-5 justify-between items-center ">
                <h3 className="opacity-50 tracking-[1px]">
                    {sortValue === undefined
                        ? "Sort order"
                        : (sortValue === "name" && "Sort by name") ||
                        (sortValue === "username" && "Sort by username") ||
                        (sortValue === "email" && "Sort by email") ||
                        (sortValue === "age" && "Sort by age") ||
                        (sortValue === "role" && "Sort by role")}
                </h3>
                <div className="flex gap-2">
                    <ActionButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setSortValue(undefined);
                        }}
                        icon={ClearIcon}
                        iconSize="w-[18px] h-[18px]"
                        iconLabel={"Clear search icon"}
                        type={"button"}
                        variant={"ghost"}
                        size={"noPadding"}
                        className="relative z-[10] cursor-pointer dark:hover:!bg-[transparent] opacity-50 hover:opacity-100 rounded-[100%]"
                    />
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
                                className={`px-4 py-2 cursor-pointer hover:bg-[#33674E]/30 hover:dark:bg-white/10 border-b border-white/30 ${
                                    i === 0 ? "rounded-t-[8px]" : ""
                                } ${i === selectOptions.length - 1 ? "rounded-b-[8px] border-b-0" : ""}`}
                            >
                                {item.option}
                            </p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default memo(AdminSort);