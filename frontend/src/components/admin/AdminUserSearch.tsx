import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchIcon from "@/components/ui/svg/other/SearchIcon";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    onSearch: () => void
}

export const AdminUserSearch = ({ searchValue, setSearchValue,onSearch }: Props) => {
    const [active, setActive] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!active) setActive(true);
        setSearchValue(e.target.value);

        console.log(searchValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch();
    };

    useEffect(() => {
        if (searchValue === "") {
            setActive(false);
        }
    }, [searchValue]);

    return (
        <form  onSubmit={handleSubmit} className="relative flex w-[240px] items-center">
            <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                className="pl-4 pr-10  py-2 absolute z-[2] border-transparent !outline-none w-full bg-[#33674E]/5 dark:bg-white/5 rounded-[8px] font-light text-[#33674E] dark:text-white tracking-[2px]"
            />
            <AnimatePresence>
                {
                    active &&
                    <motion.div
                        key="overlay"
                        initial={{ width: 0 }}
                        animate={{ width: 180 }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.5 }}
                        className="left-[16px] absolute bottom-[-14px] h-[1px] bg-[#33674E] dark:bg-white">

                    </motion.div>
                }
            </AnimatePresence>

            <div className="pl-4 absolute w-full flex justify-between items-center pointer-events-none">
                <h3
                    className={`transition-opacity text-[#33674E] dark:text-white tracking-[2px] ${
                        active || searchValue ? "opacity-0" : "opacity-50"
                    }`}
                >
                    Search...
                </h3>
                <div className="pointer-events-auto">
                    <ActionButton
                        icon={SearchIcon}
                        iconPosition="right"
                        iconSize="w-[24px] h-[24px]"
                        iconLabel="Search button"
                        size={"round"}
                        type={"submit"}
                        variant="ghost"
                        className="relative z-[10] hover:bg-[#33674E]/10 hover:dark:bg-white/10 px-1 py-1 rounded-[100%]"
                    />
                </div>
            </div>
        </form>
    );
};
