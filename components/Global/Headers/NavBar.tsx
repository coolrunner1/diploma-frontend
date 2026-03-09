import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";

export const NavBar= () => {
    return (
        <header className="min-w-full flex align-center justify-center transition-all">
            <span>Header</span>
            <ThemeSwitchButton/>
        </header>
    );
}