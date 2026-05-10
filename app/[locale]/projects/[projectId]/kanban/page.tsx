"use client"

import {useMutation, useQuery} from "@tanstack/react-query";
import {KanbanColumn} from "@/components/Project/Kanban/KanbanColumn";
import {Task} from "@/types/task";
import {DragDropProvider} from "@dnd-kit/react";
import {getStatuses} from "@/api/statuses";
import {useEffect, useState} from "react";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {useParams} from "next/navigation";
import {NewKanbanColumn} from "@/components/Project/Kanban/NewKanbanColumn";
import {PlaceholderKanbanColumn} from "@/components/Project/Kanban/PlaceholderKanbanColumn";
import {TaskDetail} from "@/components/Project/Forms/TaskDetail";
import {triggerApiError} from "@/api/projects";
import {useStore} from "@/utils/store";
import {ErrorPopupContainer} from "@/components/Global/Misc/PopupsContainer";
import {AxiosErrorToMessage} from "@/utils/mappers";
import {AxiosError} from "axios";
import {generateArrayOfUUIDs} from "@/utils/generators";
import {getTasks, updateTaskStatus} from "@/api/tasks";
import {ProjectHeader} from "@/components/Project/Headers/ProjectHeader";

export default function KanbanPage() {
    const pushError = useStore(state => state.pushMessage);

    const {error, refetch: refetchError} = useQuery({
        queryKey: ["errorTrigger"],
        queryFn: triggerApiError
    })

    useEffect(() => {
        if (error) {
            pushError(AxiosErrorToMessage(error as AxiosError));
        }
    }, [error])


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
    /*const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');*/

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

    if (!projectId) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Project was not found</p>
            </div>
        );
    }

    return (
        <>
            <ErrorPopupContainer/>
            <NavBar>
                <ProjectHeader/>
                {/*<div className={"flex flex-row flex-wrap gap-5 transition-all duration-200"}>

                </div>*/}

                <div className="flex flex-col h-full bg-background">


                    {/* Board */}
                    <div className="flex-1 overflow-x-auto p-4 no-scrollbar">
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

                                {!statuses && isLoading &&
                                    generateArrayOfUUIDs(5).map((el) =>
                                        <div key={el}>
                                            <PlaceholderKanbanColumn/>
                                        </div>
                                    )
                                }
                                {statuses && statuses.length && statuses.map(status =>
                                    <KanbanColumn
                                        key={status.uuid}
                                        name={status.name}
                                        tasks={tasks?.filter((task) => task.status === status.name)}
                                        setSelectedTask={setSelectedTask}
                                    />
                                )}
                                {statuses && <NewKanbanColumn/>}
                            </DragDropProvider>
                        </div>
                    </div>


                    {selectedTask &&
                        <TaskDetail
                            task={selectedTask}
                            setClosed={() => setSelectedTask(null)}
                            onStatusChange={handleStatusChange}
                        />
                    }
                </div>
            </NavBar>


        </>

    );
}
