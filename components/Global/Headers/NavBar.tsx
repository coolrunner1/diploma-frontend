import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";
import {LanguageSwitcher} from "@/components/Global/Buttons/LanguageSwitcher";

export const NavBar= () => {
    return (
        <header className="min-w-full flex align-center justify-center transition-all">
            <span>Header</span>
            <ThemeSwitchButton/>
            <LanguageSwitcher/>
        </header>
    );
}