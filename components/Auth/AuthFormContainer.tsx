import {Link} from "@/i18n/navigation";
import {LanguageSwitcher} from "@/components/Global/Buttons/LanguageSwitcher";
import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";
import {Card} from "../Global/ui/card";
import {ReactNode} from "react";
import {LogoButton} from "@/components/Global/Buttons/LogoButton";

export const AuthFormContainer = (props: {children: ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <header className="p-4 flex items-center justify-between">
                <LogoButton/>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeSwitchButton/>
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-xl">
                    {props.children}
                </Card>
            </div>
        </div>
    )
}