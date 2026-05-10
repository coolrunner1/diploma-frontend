import {useEffect, useState} from "react";
import {LightModeSVG} from "@/components/Global/SVGs/LightModeSVG";
import {DarkModeSVG} from "@/components/Global/SVGs/DarkModeSVG";
import {HeaderButton} from "@/components/Global/Buttons/HeaderButton";

export const ThemeSwitchButton = () => {
    const [isDark, setIsDark] = useState(false);

    const onClick = () => {
        document.body.classList.toggle('dark')
        setIsDark(!isDark);
    }

    useEffect(() => {
        const refreshIcon = setTimeout(() => {
            setIsDark(document.body.classList.contains("dark"))
        },100)
        return () => {
            clearTimeout(refreshIcon);
        }
    }, []);

    return (
        <HeaderButton
            onClick={onClick}
        >
            {isDark
                ?
                <DarkModeSVG />
                :
                <LightModeSVG/>
            }
        </HeaderButton>
    );
}