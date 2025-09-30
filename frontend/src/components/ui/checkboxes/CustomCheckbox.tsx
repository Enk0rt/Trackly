import { motion } from "framer-motion";
import CheckboxIcon from "@/components/ui/svg/checkbox/CheckboxIcon";
import React, { FC } from "react";
import { IUser } from "@/interfaces/user/IUser";

type Props = {
    user: IUser;
    isChooseMode: boolean,
    isSelected: boolean;
    toggleUserSelection: (userId: string) => void;
}

const CustomCheckbox: FC<Props> = ({ isChooseMode, toggleUserSelection, user, isSelected }) => {
    return (
        <>
            {isChooseMode && (
                <motion.div
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: !isChooseMode ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleUserSelection(user._id);
                    }}
                    role={"checkbox"}
                    aria-label={"User selection checkbox"}
                    className="absolute left-[-40px] w-[24px] h-[24px] flex justify-center items-center overflow-hidden rounded-[4px]"
                >
                    <CheckboxIcon className="w-full h-full text-[#33674E] dark:text-white" />

                    <motion.div
                        animate={{
                            scale: isSelected ? 0 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute w-[40px] h-[40px] dark:bg-white bg-[#33674E] rounded-full"
                    />
                </motion.div>
            )}
        </>
    );
};

export default React.memo(CustomCheckbox);