"use client"
import React, { useEffect, useState } from "react";
import { Theme, ThemeContext } from "@/components/theme-changer/theme-provider/theme-context/ThemeContext";

type Props = {
    children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle("dark", saved === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initial = prefersDark ? "dark" : "light";
            setTheme(initial);
            document.documentElement.classList.toggle("dark", initial === "dark");
        }
    }, []);


    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme",theme)
    }, [theme]);


    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light" )
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

