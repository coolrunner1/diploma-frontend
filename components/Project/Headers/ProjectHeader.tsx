import {SearchBar} from "@/components/Global/Inputs/SearchBar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/Global/FigmaTempVibe/select";
import {Filter} from "lucide-react";
import {useState} from "react";

export const ProjectHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');

    return (
    <div className="bg-container shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
            {/*<CreateTaskDialog projectId={projectId || ''} onCreateTask={handleCreateTask} />*/}
        </div>

        <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
                <SearchBar
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    keyPressHandler={() => {
                    }}
                />
            </div>
            {/*Prototype*/}
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2"/>
                    <SelectValue placeholder="Filter by type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
    )
}