import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export function useAdminSearch(
    setSearchValue: Dispatch<SetStateAction<string>>,
    onSearch: () => void
) {
    const [active, setActive] = useState(false);
    const [inputVal, setInputVal] = useState("");

    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                setSearchValue(val);
            }, 500),
        [setSearchValue]
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
            onSearch();
        },
        [onSearch]
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