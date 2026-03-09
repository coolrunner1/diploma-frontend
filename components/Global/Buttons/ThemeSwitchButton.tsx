import {useEffect, useState} from "react";
import {LightModeSVG} from "@/components/Global/SVGs/LightModeSVG";
import {DarkModeSVG} from "@/components/Global/SVGs/DarkModeSVG";

export const ThemeSwitchButton = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.body.classList.contains("dark"));
    }, []);

    const onClick = () => {
        document.body.classList.toggle('dark')
        setIsDark(!isDark);
    }

    return (
        <button
            className={"p-3 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white shadow-md transition-all duration-200"}
            onClick={onClick}
        >
            {isDark
                ?
                <DarkModeSVG />
                :
                <LightModeSVG/>
            }
        </button>
    );
}