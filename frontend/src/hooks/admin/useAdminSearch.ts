import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export function useAdminSearch(
    setSearchValue: Dispatch<SetStateAction<string | undefined>>,
    onSearch: () => void,
    setPage: Dispatch<SetStateAction<number>>,
    initialSearch: string | undefined
) {
    const [active, setActive] = useState(false);
    const [inputVal, setInputVal] = useState(initialSearch || '');

    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                setSearchValue(val);
                setPage(1)
            }, 500),
        [setPage, setSearchValue]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const val = e.target.value;
            if (!active) setActive(true);
            setInputVal(val);
            debouncedSearch(val);
        },
        [active, debouncedSearch]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setPage(1)
            onSearch();
        },
        [onSearch, setPage]
    );

    const handleClear = useCallback(() => {
        setSearchValue("");
        setInputVal("");
        onSearch();
    }, [setSearchValue, onSearch]);

    useEffect(() => {
        if (inputVal === "") setActive(false);
    }, [inputVal]);

    return {
        active,
        inputVal,
        handleChange,
        handleSubmit,
        handleClear,
    };
}