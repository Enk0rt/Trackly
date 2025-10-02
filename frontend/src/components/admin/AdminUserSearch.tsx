import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import SearchIcon from "@/components/ui/svg/other/SearchIcon";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import ClearIcon from "@/components/ui/svg/other/ClearIcon";

type Props = {
    setSearchValue: Dispatch<SetStateAction<string>>
    onSearch: () => void
}

export const AdminUserSearch = ({ setSearchValue, onSearch }: Props) => {
    const [active, setActive] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>("");

    const debouncedSearch = useMemo(
        () => debounce((val: string) => {
            setSearchValue(val);
            onSearch();
        }, 500),
        [onSearch, setSearchValue],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const val = e.target.value;
        if (!active) setActive(true);
        setInputVal(val);
        debouncedSearch(val);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch();
    };

    const handleClear = () => {
        setSearchValue("");
        setInputVal("");
        onSearch();
    };
    useEffect(() => {
        if (inputVal === "") {
            setActive(false);
        }
    }, [inputVal]);

    return (
        <form onSubmit={handleSubmit} className="relative flex w-[270px] items-center">
            <input
                type="text"
                value={inputVal}
                onChange={handleChange}
                className="pl-4 pr-20  py-2 absolute z-[2] border-transparent !outline-none w-full bg-[#33674E]/5 dark:bg-white/5 rounded-[8px] font-light text-[#33674E] dark:text-white tracking-[2px]"
            />
            <AnimatePresence>
                {
                    active &&
                    <motion.div
                        key="overlay"
                        initial={{ width: 0 }}
                        animate={{ width: 176 }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.5 }}
                        className="left-[16px] absolute bottom-[-14px] h-[1px] bg-[#33674E] dark:bg-white">

                    </motion.div>
                }
            </AnimatePresence>

            <div className="pl-4 absolute w-full flex justify-end items-center pointer-events-none">
                <h3
                    className={`transition-opacity text-[#33674E] grow-1 dark:text-white tracking-[1px] ${
                        active || inputVal ? "opacity-0" : "opacity-50"}`}>
                    Search...
                </h3>
                <div className="pointer-events-auto">
                    <ActionButton onClick={handleClear} icon={ClearIcon} iconSize="w-[22px] h-[22px]"
                                  iconLabel={"Clear search icon"}
                                  type={"button"} variant={"ghost"} size={"noPadding"}
                                  className="relative z-[10] cursor-pointer dark:hover:!bg-[transparent] opacity-50 hover:opacity-100 rounded-[100%]" />
                </div>
                <div className="pointer-events-auto">
                    <ActionButton
                        icon={SearchIcon}
                        iconPosition="right"
                        iconSize="w-[26px] h-[26px]"
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
