import {Bell, Menu,} from 'lucide-react';
import {ReactNode, useState} from 'react';
import {Button} from "@/components/Global/ui/button";
import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";
import {LanguageSwitcher} from "@/components/Global/Buttons/LanguageSwitcher";
import {HeaderButtonContainer} from "@/components/Global/Buttons/HeaderButtonContainer";
import {SidebarContent} from "@/components/Global/Headers/SidebarContent";
import { ErrorPopupContainer } from "@/components/Global/Misc/PopupsContainer";


export type NavBarProps = {
    children: ReactNode;
}

export const NavBar = (props: NavBarProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen">
            <aside
                className={`${sidebarOpen ? "flex" : "hidden"} bg-container md:flex w-full md:w-64 border-r border-default-border flex-col`}>
                <SidebarContent setClosed={() => setSidebarOpen(false)}/>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="border-b border-default-border px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="w-5 h-5"/>
                            </Button>
                            {/*currentProject && (
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="text-xl">{currentProject.icon}</span>
                                    <span className="font-semibold">{currentProject.name}</span>
                                    <span className="text-sm text-gray-500">/ </span>
                                    <span className="text-sm text-gray-700">
                    {location.pathname.includes('/board') ? 'Board' : 'List'}
                  </span>
                                </div>
                            )*/}
                        </div>

                        <div className="flex items-center gap-2">
                            <ThemeSwitchButton type={"regular"}/>
                            <LanguageSwitcher type={"regular"}/>
                            <HeaderButtonContainer>
                                <Bell/>
                            </HeaderButtonContainer>
                        </div>
                    </div>
                </header>
                {props.children}
            </div>
        </div>
    );
}