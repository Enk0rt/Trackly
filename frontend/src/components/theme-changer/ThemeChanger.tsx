"use client";

import { useTheme } from "next-themes";

export const ThemeChanger = () => {
    const {theme, setTheme} = useTheme();

    console.log(theme)
    return (
        <div>
            <button onClick={() => setTheme('light')}>Light Mode</button>
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
    );
};