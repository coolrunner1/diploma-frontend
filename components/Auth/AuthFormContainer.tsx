import {Link} from "@/i18n/navigation";
import {LanguageSwitcher} from "@/components/Global/Buttons/LanguageSwitcher";
import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";
import {Card} from "@/components/Global/FigmaTempVibe/card";
import {ReactNode} from "react";

export const AuthFormContainer = (props: {children: ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <header className="p-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        PM
                    </div>
                    <span className="font-bold text-xl">ProjectHub</span>
                </Link>
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