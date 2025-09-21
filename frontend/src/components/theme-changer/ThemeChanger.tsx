"use client";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

export const ThemeChanger = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-[20px] w-[20px]" />
        );
    }

    return (
            <button
                className="flex items-center relative h-[20px] w-[20px] cursor-pointer"
                onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
            >
                <FaMoon
                    key={resolvedTheme === "light" ? "in" : "out"}
                    className={`absolute h-full w-full top-0 opacity-100 dark:opacity-0 will-change-transform transition-all duration-500 ease-in-out cursor-pointer
            ${resolvedTheme === "light" ? "rotateIn" : "rotateOut"}`}
                />
                <FaSun
                    key={resolvedTheme === "dark" ? "in" : "out"}
                    className={`absolute h-full w-full top-0  text-white opacity-0 dark:opacity-100 will-change-transform transition-all duration-500 ease-in-out cursor-pointer
            ${resolvedTheme === "dark" ? "rotateIn" : "rotateOut"}`}
                />
            </button>
    );
};