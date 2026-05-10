
import {
    LayoutGrid,
    List,
    Settings,
    Search,
    Bell,
    Menu,
    ChevronDown,
    Folder,
    Home,
    Calendar,
    BarChart3,
    Users,
    Lock,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/Global/FigmaTempVibe/dropdown-menu';
import { useState } from 'react';
import {Link} from "@/i18n/navigation";
import {useParams} from "next/navigation";
import {Button} from "@/components/Global/FigmaTempVibe/button";
import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";
import {LanguageSwitcher} from "@/components/Global/Buttons/LanguageSwitcher";
import {HeaderButton} from "@/components/Global/Buttons/HeaderButton";

const SidebarContent = () => {
    const { projectId } = useParams();
    //const currentProject = projects.find((p) => p.id === projectId);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Projects', href: '/', icon: Home },
        { name: 'Team', href: '/team', icon: Users },
        { name: 'Blocking Tasks', href: '/blocking-tasks', icon: Lock },
    ];

    return(
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                        PM
                    </div>
                    <span className="font-semibold text-lg">Project Manager</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="pt-4">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Your Projects
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

            <div className="p-4 border-t border-gray-200">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            {/*<Avatar className="w-8 h-8">
                                    <AvatarImage src="https://i.pravatar.cc/150?img=8" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>*/}
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-gray-500">john@example.com</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem asChild>
                            <Link href="/profile" onClick={() => setSidebarOpen(false)}>
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings" onClick={() => setSidebarOpen(false)}>
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar
            <div open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <div side="left" className="p-0 w-64">
                    <SidebarContent />
                </div>
            </div>*/}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="w-5 h-5" />
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
                            <ThemeSwitchButton/>
                            <LanguageSwitcher/>
                            <HeaderButton>
                                <Bell />
                            </HeaderButton>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-hidden">
                </main>
            </div>
        </div>
    );
}