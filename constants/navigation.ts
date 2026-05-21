import {BarChart3, Calendar, LayoutGrid, List, MapPin, Lock, Users, Settings, Home} from "lucide-react";

export const navigation = [
    {name: 'projects', href: '/projects', icon: Home},
];

export const projectNavigation = [
    {name: 'board-view', href: `kanban`, icon: LayoutGrid},
    {name: 'list-view', href: `list-view`, icon: List},
    {name: 'calendar', href: `calendar`, icon: Calendar},
    {name: 'stats', href: `stats`, icon: BarChart3},
    {name: 'timeline', href: `timeline`, icon: MapPin},
    {name: 'Navbar.blocking-tasks', href: `blocking-tasks`, icon: Lock},
    {name: 'team', href: `team`, icon: Users},
    {name: 'settings', href: `settings`, icon: Settings},
]