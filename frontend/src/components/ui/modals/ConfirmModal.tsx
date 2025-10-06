"use client";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import React from "react";
import ActionButton from "@/components/ui/buttons/action-button/ActionButton";

type ConfirmModalProps = {
    show: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
                                                              show,
                                                              title = "Are you sure?",
                                                              message = "Please confirm your action.",
                                                              confirmLabel = "Confirm",
                                                              cancelLabel = "Cancel",
                                                              onConfirm,
                                                              onCancel,
                                                          }) => {
    if (typeof document === "undefined") return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        className="bg-white dark:bg-[#33674E]/90 text-[#33674E] dark:text-white rounded-xl p-6 w-[90%] max-w-md shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <h2 className="text-lg font-semibold text-center">{title}</h2>
                        <p className="mt-3 text-center">{message}</p>

                        <div className="mt-6 flex justify-center gap-4">
                            <ActionButton
                                onClick={onCancel}
                                variant="secondary"
                                size="md"
                            >
                                {cancelLabel}
                            </ActionButton>

                            <ActionButton
                                onClick={onConfirm}
                                variant="secondary"
                                size="md"
                                className='border-none'
                            >
                                {confirmLabel}
                            </ActionButton>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
