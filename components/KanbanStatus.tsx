import {Task} from "@/types/task";
import {KanbanTask} from "@/components/KanbanTask";
import {useDroppable} from "@dnd-kit/react";

export type KanbanStatusProps = {
    id: string;
    status: string;
    tasks?: Task[];
    children?: React.ReactNode;
}

export const KanbanStatus = (props: KanbanStatusProps) => {

    const {ref} = useDroppable({
        id: props.id,
    });

    return (
        <div ref={ref} className={"p-2 rounded-md shadow-lg"}>
            <div className={"bg-gray-200"}>{props.status}</div>
            {props.tasks && props.tasks.length > 0 && props.tasks.map((task: Task) => (
                <KanbanTask
                    key={task.uuid}
                    task={task}
                />
            ))}
            {props.children}
            <div className={"bg-gray-200"}>add-task</div>
        </div>
    )
}