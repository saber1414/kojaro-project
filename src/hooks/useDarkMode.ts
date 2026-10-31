"use client"
import { useEffect, useState } from 'react';

type ThemeMode = "dark" | "light" | "system";

const useDarkMode = () => {
    const [theme, setTheme] = useState<ThemeMode>('system');
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const sortedTheme = localStorage.getItem("theme") as ThemeMode | null;

        if (sortedTheme) setTheme(sortedTheme)
        else setTheme("system");
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const root = document.documentElement;
        let shouldBeDark = false;

        if (theme === "system") {
            const prefersDark = window.matchMedia("prefers-color-scheme: dark").matches;
            shouldBeDark = prefersDark;
        } else {
            shouldBeDark = theme === "dark";
        };

        setIsDark(shouldBeDark);

        if (shouldBeDark) root.classList.add("dark")
        else root.classList.remove("dark");

        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("prefers-color-scheme: dark");

        const handleChange = () => {
            if (theme === 'system') {
                const isDarkNow = mediaQuery.matches;
                setIsDark(isDarkNow);

                const root = document.documentElement;
                if (isDarkNow) {
                    root.classList.add("dark")
                } else {
                    root.classList.remove("dark")
                }
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const setDarkMode = () => setTheme("dark");
    const setLightMode = () => setTheme("light");
    const setSystemMode = () => setTheme("system");

    const toggleDarkMode = () => {
        if (theme === "dark") {
            setTheme("light")
        } else if (theme === "light") {
            setTheme("dark")
        } else {
            const currentIsDark = window.matchMedia("prefers-color-scheme: dark").matches;
            setTheme(currentIsDark ? "light" : "dark")
        }
    };

    return { isDark, theme, setDarkMode, setLightMode, setSystemMode, toggleDarkMode }
};

export default useDarkMode;