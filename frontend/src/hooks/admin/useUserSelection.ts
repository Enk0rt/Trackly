import { useCallback, useEffect, useState } from "react";

export const useUserSelection = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);

    const [chooseMode, setChooseMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [showOnlySelected, setShowOnlySelected] = useState<boolean>(false);

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
            const timeout = setTimeout(() => {
                    setChooseMode(false);
                    setShowOnlySelected(false);
                    setPage(1);
                    setPageSize(3);
                }
                , 300);
            return () => clearTimeout(timeout);
        }
    }, [selectedIds.size]);

    return {
        chooseMode,
        selectedIds,
        toggleUserSelection,
        activateChooseMode,
        setSelectedIds,
        showOnlySelected,
        setShowOnlySelected,
        page,
        setPage,
        pageSize,
        setPageSize,
    };
};