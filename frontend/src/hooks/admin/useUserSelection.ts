import { useCallback, useEffect, useState } from "react";

export const useUserSelection = () => {
    const [chooseMode, setChooseMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleUserSelection = useCallback((userId: string) => {
        setSelectedIds((prev) => {
            const copy = new Set(prev);
            if (copy.has(userId)) {
                copy.delete(userId);
            } else {
                copy.add(userId);
            }
            return copy;
        });
    }, []);

    const activateChooseMode = (userId: string) => {
        setChooseMode(true);
        setSelectedIds(new Set([userId]));
    };

    useEffect(() => {
        if (selectedIds.size === 0) {
            const timeout = setTimeout(() => setChooseMode(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [selectedIds.size]);

    return { chooseMode, selectedIds, toggleUserSelection, activateChooseMode, setSelectedIds };
};