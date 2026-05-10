import {ChevronDown, Home, Lock, SidebarClose, Users,} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/Global/FigmaTempVibe/dropdown-menu';
import {Link} from "@/i18n/navigation";
import {useParams} from "next/navigation";
import {LogoButton} from "@/components/Global/Buttons/LogoButton";
import {useTranslations} from "next-intl";
import {Avatar, AvatarFallback} from "@/components/Global/FigmaTempVibe/avatar";

export type SidebarContentProps = {
    setClosed: () => void
}

export const SidebarContent = (props: SidebarContentProps) => {
    const {projectId} = useParams();
    //const currentProject = projects.find((p) => p.id === projectId);

    const t = useTranslations();

    const navigation = [
        {name: 'projects', href: '/', icon: Home},
        {name: 'team', href: '/team', icon: Users},
        {name: 'Navbar.blocking-tasks', href: '/blocking-tasks', icon: Lock},
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between p-4 bg-background border-b border-default-border">
                <LogoButton/>
                <SidebarClose className="my-auto md:hidden" onClick={props.setClosed}/>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => props.setClosed()}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                isActive
                                    ? 'text-blue-700'
                                    : 'hover:bg-hover'
                            }`}
                        >
                            <Icon className="w-5 h-5"/>
                            <span className="font-medium">{t(item.name)}</span>
                        </Link>
                    );
                })}

                <div className="pt-4">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t('Navbar.your-projects')}
                    </div>
                    <div className="space-y-1 mt-2">
                        {/*projects.map((project) => (
                                <div key={project.id}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                                    projectId === project.id
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span className="text-lg">{project.icon}</span>
                                                <span className="flex-1 text-left text-sm font-medium truncate">
                                                    {project.name}
                                                </span>
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-56">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/project/${project.id}/board`}
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    <LayoutGrid className="w-4 h-4 mr-2" />
                                                    Board View
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/project/${project.id}/list`}
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    <List className="w-4 h-4 mr-2" />
                                                    List View
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/project/${project.id}/calendar`}
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Calendar
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/project/${project.id}/stats`}
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    <BarChart3 className="w-4 h-4 mr-2" />
                                                    Statistics
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Settings className="w-4 h-4 mr-2" />
                                                Project Settings
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))*/}
                    </div>
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-hover transition-colors">
                            <Avatar className="w-8 h-8">
                                {/*<AvatarImage src="https://i.pravatar.cc/150?img=8" />*/}
                                <AvatarFallback title={'JD'}/>
                            </Avatar>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-gray-500">john@example.com</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400"/>
                            {/*<ChevronUp className="w-4 h-4 text-gray-400" />*/}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem asChild>
                            <Link href="/profile" onClick={() => props.setClosed()}>
                                {t("profile")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings" onClick={() => props.setClosed()}>
                                {t("settings")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>{t("Auth.sign-out")}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}