import {useEffect, useState} from "react";
import {LightModeSVG} from "@/components/Global/SVGs/LightModeSVG";
import {DarkModeSVG} from "@/components/Global/SVGs/DarkModeSVG";
import {HeaderButton} from "@/components/Global/Buttons/HeaderButton";

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