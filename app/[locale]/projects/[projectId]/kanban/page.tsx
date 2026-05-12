"use client"

import {useMutation, useQuery} from "@tanstack/react-query";
import {KanbanColumn} from "@/components/Project/Kanban/KanbanColumn";
import {Task} from "@/types/task";
import {DragDropProvider} from "@dnd-kit/react";
import {useEffect, useState} from "react";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {useParams} from "next/navigation";
import {NewKanbanColumn} from "@/components/Project/Kanban/NewKanbanColumn";
import {PlaceholderKanbanColumn} from "@/components/Project/Kanban/PlaceholderKanbanColumn";
import {TaskDetail} from "@/components/Project/Forms/TaskDetail";
import {getProjectBoard} from "@/api/projects";
import {useStore} from "@/utils/store";
import {ErrorPopupContainer} from "@/components/Global/Misc/PopupsContainer";
import {AxiosErrorToMessage} from "@/utils/mappers";
import {AxiosError} from "axios";
import {generateArrayOfUUIDs} from "@/utils/generators";
import {updateTaskStatus} from "@/api/tasks";
import {ProjectHeader} from "@/components/Project/Headers/ProjectHeader";
import {ProjectStatus} from "@/types/project";
import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";

export default function KanbanPage() {
    const {projectId} = useParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statuses, setStatuses] = useState<ProjectStatus[]>([]);

    const {data, isLoading, isError} = useQueryWithErrorQueue({
        queryFn: getProjectBoard,
        queryKey: ["_board", projectId]
    });

    const {mutate: updateTask} = useMutation({
        mutationFn: updateTaskStatus,
    });

    useEffect(() => {
        if (!data) return;
        setStatuses(data.projectStatus);
        setTasks(data.tasks);

    }, [data]);

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

    const handleStatusChange = (taskId: string, newStatus: Task['statusId']) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.uuid === taskId ? {...task, statusId: newStatus} : task
            )
        );
        if (selectedTask && selectedTask.uuid === taskId) {
            setSelectedTask({...selectedTask, statusId: newStatus});
        }
    };

    const handleCreateTask = (newTask: Task) => {
        setTasks((prev) => [...prev, newTask]);
    };

    return (
        <>
            <NavBar>
                <ProjectHeader/>
                {/*<div className={"flex flex-row flex-wrap gap-5 transition-all duration-200"}>

                </div>*/}


                <div className="flex-1 overflow-x-auto h-full p-4 no-scrollbar">
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
                                updateTask({mutationKey: ["tasks", projectId, source?.id, target?.id]});
                                const newTasks = tasks;
                                newTasks.forEach((task: Task) => {
                                    if (task.id === source?.id) {
                                        if (!target?.id) return;
                                        task.statusId = Number(target?.id);
                                    }
                                });
                                setTasks(newTasks);
                                //refetchTasks();
                            }}
                        >
                            {isError && !data &&
                                <div className="flex items-center justify-center h-full w-full">
                                    <p className="text-gray-500">Errors.something-wrong</p>
                                </div>
                            }
                            {!statuses.length && isLoading &&
                                generateArrayOfUUIDs(5).map((el) =>
                                    <div key={el}>
                                        <PlaceholderKanbanColumn/>
                                    </div>
                                )
                            }
                            {statuses.length > 0 && statuses.map(status =>
                                <KanbanColumn
                                    key={status.uuid}
                                    id={status.id}
                                    title={status.title}
                                    bgColor={status.bgColor}
                                    tasks={tasks?.filter((task) => task.statusId === status.id)}
                                    setSelectedTask={setSelectedTask}
                                />
                            )}
                            {statuses.length > 0 && <NewKanbanColumn/>}
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
            </NavBar>


        </>

    );
}
