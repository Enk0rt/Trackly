import { Dispatch, FC, memo, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";

type Size = "sm" | "md" | "lg";

type Props = {
    size?: Size;
    children?: ReactNode;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const DefaultModal: FC<Props> = ({
                                            size = "md",
                                            children,
                                            showModal,
                                            setShowModal,
                                        }) => {
    const sizeClasses: Record<Size, string> = {
        sm: "max-w-sm px-4 py-2",
        md: "max-w-lg px-8 py-5",
        lg: "max-w-2xl px-10 py-6",
    };
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setShowModal(false), showModal);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal]);

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        key={"overlay"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 100 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .4 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overscroll-y-none">
                        <motion.div
                            ref={containerRef}
                            key={"overlay"}
                            initial={{ translateY: -20 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: 10 }}
                            transition={{ duration: .5 }}
                            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto rounded-lg bg-white dark:bg-[#33674E]/40 shadow-lg p-6 backdrop-blur-[5px]`}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-5 text-[#33674E] dark:text-white hover:opacity-50 cursor-pointer transition"
                            >
                                ✕
                            </button>

                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(DefaultModal)