import {useEffect, useState} from "react";
import {LightModeSVG} from "@/components/Global/SVGs/LightModeSVG";
import {DarkModeSVG} from "@/components/Global/SVGs/DarkModeSVG";
import {HeaderButtonContainer, HeaderButtonProps} from "./HeaderButtonContainer";

export const ThemeSwitchButton = (props: HeaderButtonProps) => {
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
        <HeaderButtonContainer
            type={props.type}
            onClick={onClick}
        >
            {isDark
                ?
                <DarkModeSVG />
                :
                <LightModeSVG/>
            }
        </HeaderButtonContainer>
    );
}