import {Task} from "@/types/task";
import {useDraggable} from "@dnd-kit/react";

export type KanbanTaskProps = {
    task: Task;
};

export const KanbanTask = (props: KanbanTaskProps) => {

    const {ref} = useDraggable({
        id: props.task.uuid,
        type: "task",
    })

    return (
        <div ref={ref} className="select-none">
            {props.task.name}
        </div>
    )
}