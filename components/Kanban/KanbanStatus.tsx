import {Task} from "@/types/task";
import {KanbanTask} from "@/components/Kanban/KanbanTask";
import {DragDropProvider, useDroppable} from "@dnd-kit/react";
import {ReactNode, useState} from "react";

export type KanbanStatusProps = {
    //id: string;
    name: string;
    tasks?: Task[];
}

export const KanbanStatus = (props: KanbanStatusProps) => {
    const [isDropped, setIsDropped] = useState(false);

    const {ref} = useDroppable({
        id: props.name,
        type: "status"
    });

    return (
        <div ref={ref} className={"p-2 rounded-md shadow-lg"}>
            <div className={"bg-gray-200"}>{props.name}</div>
            {props.tasks && props.tasks.length > 0 && props.tasks.map((task: Task) => (
                <KanbanTask
                    key={task.uuid}
                    task={task}
                />
            ))}
            <div className={"bg-gray-200"}>add-task</div>
        </div>
    )
}