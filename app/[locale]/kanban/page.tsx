"use client"

import {useMutation, useQuery} from "@tanstack/react-query";
import {getTasks, updateTaskStatus} from "@/api/tasks";
import {KanbanColumn} from "@/components/Kanban/KanbanColumn";
import {Task} from "@/types/task";
import {KanbanTask} from "@/components/Kanban/KanbanTask";
import {DragDropProvider} from "@dnd-kit/react";
import {getStatuses} from "@/api/statuses";
import {useEffect, useState} from "react";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {useParams} from "next/navigation";
import {SearchBar} from "@/components/Global/Inputs/SearchBar";
import {NewKanbanColumn} from "@/components/Kanban/NewKanbanColumn";

export default function KanbanPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const {data: statuses, isLoading, isError} = useQuery({
        queryKey: ["statuses"],
        queryFn: getStatuses,
    });

    const {data: fetchedTasks, refetch: refetchTasks} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const {mutate: updateTask} = useMutation({
        mutationFn: updateTaskStatus,
    });

    useEffect(() => {
        if (!fetchedTasks) return;
        setTasks(fetchedTasks);
    }, [fetchedTasks]);

    const {projectId} = useParams();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');

    //const project = projects.find((p) => p.id === projectId);
    //const projectTasks = tasks.filter((task) => task.projectId === projectId);

    /*const filteredTasks = projectTasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || task.type === filterType;
        return matchesSearch && matchesType;
    });*/

    const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.uuid === taskId ? {...task, status: newStatus} : task
            )
        );
        if (selectedTask && selectedTask.uuid === taskId) {
            setSelectedTask({...selectedTask, status: newStatus});
        }
    };

    const handleCreateTask = (newTask: Task) => {
        setTasks((prev) => [...prev, newTask]);
    };

    if (!!projectId) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Project not found</p>
            </div>
        );
    }

    return (
        <>
            <NavBar/>
            {isLoading && <div className={"h-screen w-screen animate-pulse bg-gray-400"}>placeholder</div>}
            {!isLoading && !isError && statuses &&
                <>
                    <div className={"flex flex-row flex-wrap gap-5 transition-all duration-200"}>

                    </div>

                    <div className="flex flex-col h-full bg-background">
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-4">
                                {/*<CreateTaskDialog projectId={projectId || ''} onCreateTask={handleCreateTask} />*/}
                            </div>

                            {/* Filters */}
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
                                {/*<Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger className="w-[160px]">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="task">Task</SelectItem>
                                        <SelectItem value="bug">Bug</SelectItem>
                                        <SelectItem value="story">Story</SelectItem>
                                        <SelectItem value="epic">Epic</SelectItem>
                                    </SelectContent>
                                </Select>*/}
                            </div>
                        </div>

                        {/* Board */}
                        <div className="flex-1 overflow-x-auto p-4">
                            <div className="flex gap-4 h-full min-w-max">
                                <DragDropProvider
                                    onDragStart={event => {
                                        /*console.log("drag start");
                                        console.log(event.operation.source?.type);
                                        /*if (event.operation.target) {
                                            setActiveTask(event.active.data.current.task);
                                            return;
                                        }*/
                                    }}
                                    onDragEnd={(event) => {
                                        if (event.canceled) return;

                                        const {target, source} = event.operation;
                                        updateTask({mutationKey: ["tasks", source?.id, target?.id]});
                                        const newTasks = tasks;
                                        newTasks.forEach((task: Task) => {
                                            if (task.uuid === source?.id) {
                                                if (!target?.id) return;
                                                task.status = target?.id.toString();
                                            }
                                        });
                                        setTasks(newTasks);
                                        //refetchTasks();
                                    }}
                                >
                                    {statuses.length && statuses.map(status =>
                                        <KanbanColumn
                                            key={status.uuid}
                                            name={status.name}
                                            tasks={tasks?.filter((task) => task.status === status.name)}
                                        />
                                    )}
                                    <NewKanbanColumn/>
                                </DragDropProvider>
                            </div>
                        </div>

                        {/* Task Detail
                            <TaskDetail
                                task={selectedTask}
                                open={!!selectedTask}
                                onOpenChange={(open) => !open && setSelectedTask(null)}
                                onStatusChange={handleStatusChange}
                            />
                            */}
                    </div>
                </>

            }

        </>

    );
}
