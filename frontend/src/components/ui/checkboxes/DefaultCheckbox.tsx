import React, { FC, memo } from "react";
import CheckboxIcon from "@/components/ui/svg/checkbox/CheckboxIcon";
import { motion } from "framer-motion";

type Props = {
    action: ()=>void
    condition: boolean
}


const DefaultCheckbox:FC<Props> = ({action,condition}) => {
    return (
        <button onClick={action}
                className="relative flex items-center justify-center w-[20px] h-[20px] overflow-hidden rounded-[4px]">
            <CheckboxIcon className="w-full h-full text-[#33674E] dark:text-white" />
            <motion.div
                initial={false}
                animate={{
                    scale: condition ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="absolute w-[30px] h-[30px] dark:bg-white bg-[#33674E] rounded-[100%]">
            </motion.div>
        </button>
    );
};

export default memo(DefaultCheckbox)