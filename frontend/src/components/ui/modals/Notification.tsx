"use client";
import { motion, AnimatePresence } from "framer-motion";
import { INotification } from "@/interfaces/notifications/INotification";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NotificationEnum } from "@/enums/notificationEnum";
import { FC, memo } from "react";

type Props = {
    notifications: INotification[];
    onClose: (id: string) => void;
};

const Notification:FC<Props> = ({ notifications, onClose }) => {
    const iconMap = {
        [NotificationEnum.WARNING]: <ExclamationTriangleIcon className="w-[26px] h-[26px] text-amber-300" />,
        [NotificationEnum.ERROR]: <ExclamationCircleIcon className="w-[26px] h-[26px] text-red-300" />,
        [NotificationEnum.SUCCESS]: <CheckCircleIcon className="w-[26px] h-[26px] text-[#33674E]" />,
    };

    return (
        <div className="absolute z-[51] left-1/2 -translate-x-1/2 top-[90px] flex flex-col gap-3">
            <AnimatePresence>
                {Array.from(notifications).map(({ message, id ,type }) => (
                    <motion.div
                        key={id}
                        initial={{ translateX: -100, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        exit={{ translateX: -100, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative px-7 py-4 w-fit bg-white rounded-[14px] text-[#33674E] shadow-md order-1 flex gap-4"
                    >
                        <div className="pr-4 border-r border-r-[#33674E]">
                            {iconMap[type as NotificationEnum]}
                        </div>
                        <p>{message}</p>
                        <div
                            onClick={() => onClose(id)}
                            className="absolute right-[10px] top-[8px] cursor-pointer text-[12px] opacity-60 hover:opacity-100 transition"
                        >
                            ✕
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
export default memo(Notification)