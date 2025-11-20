import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    step: number
    totalSteps: number
}

export const StepperStatusBar: FC<Props> = ({ step,totalSteps }) => {
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mb-6 flex items-center gap-5">
            {
                Array.from({ length: totalSteps }).map((_, i) => {
                    const index = i + 1;
                    const isFilled = step >= index;

                    return (
                        <li key={i} className="w-26 h-[6px] rounded-[4px] bg-white dark:bg-[#33674E] relative overflow-x-hidden">
                            <AnimatePresence mode={"wait"}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: isFilled ? "100%" : "0%" }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className={"bg-[#33674E] dark:bg-white absolute z-10 h-[6px]"}>

                                </motion.div>
                            </AnimatePresence>
                        </li>
                    );
                })
            }
        </motion.ul>
    );
};

export default StepperStatusBar;