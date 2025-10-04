import {useCallback, useRef, useState } from "react";
import { NotificationEnum } from "@/enums/notificationEnum";
import { v4 as uuidv4 } from "uuid";
import { INotification } from "@/interfaces/notifications/INotification";

export const useNotification = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    const addNotification = useCallback((message: string, type: NotificationEnum) => {
        setNotifications((prev) => {
            const filtered = prev.filter(n => n.message !== message);
            const newNotification = { id: uuidv4(), message, type };
            return [newNotification, ...filtered];
        });

        if (timeouts.current.has(message)) {
            clearTimeout(timeouts.current.get(message));
        }

        setTimeout(() => {
            setNotifications((prev) => prev.filter(n => n.message !== message));
            timeouts.current.delete(message);
        }, 4000);

    }, []);

    const closeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter(notification => notification.id !== id));
    }, []);

    return { addNotification,closeNotification,notifications}
}