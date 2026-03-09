"use client"

import {useMutation, useQuery} from "@tanstack/react-query";
import {getTasks, updateTaskStatus} from "@/api/tasks";
import {KanbanStatus} from "@/components/Kanban/KanbanStatus";
import {Task} from "@/types/task";
import {KanbanTask} from "@/components/Kanban/KanbanTask";
import {DragDropProvider} from "@dnd-kit/react";
import {getStatuses} from "@/api/statuses";
import {useEffect, useState} from "react";
import {NavBar} from "@/components/Global/Headers/NavBar";

export default function KanbanPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const {data, isLoading, isError} = useQuery({
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

    return (
        <>
            <NavBar/>
            {isLoading && <div className={"h-screen w-screen animate-pulse bg-gray-400"}>placeholder</div>}
            {!isLoading && !isError && data &&
                <div className={"flex flex-row flex-wrap gap-5 transition-all duration-200"}>
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
                        {data.length && data.map(status =>
                            <KanbanStatus
                                key={status.uuid}
                                name={status.name}
                                tasks={tasks?.filter((task) => task.status === status.name)}
                            />
                        )}
                        <KanbanStatus
                            name={"There should be an element for creating a new kanban status"}
                            tasks={[]}
                        />
                    </DragDropProvider>
                </div>
            }

        </>
    );
}
