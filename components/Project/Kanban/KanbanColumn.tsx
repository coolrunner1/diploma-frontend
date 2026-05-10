import {Task} from "@/types/task";
import {KanbanTask} from "@/components/Project/Kanban/KanbanTask";
import {useDroppable} from "@dnd-kit/react";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {Button} from "@/components/Global/FigmaTempVibe/button";
import {Input} from "@/components/Global/FigmaTempVibe/input";
import {stringToHexColor} from "@/utils/utils";

export type KanbanColumnProps = {
    //id: string;
    name: string;
    tasks?: Task[];
    setSelectedTask: (task: Task) => void;
}

export const KanbanColumn = (props: KanbanColumnProps) => {
    const [editStatus, setEditStatus] = useState(false);

    const {ref} = useDroppable({
        id: props.name,
        type: "status"
    });

    return (
        <>
            <div className="flex flex-col w-80 max-h-[80vh] overflow-scroll bg-container rounded-lg border border-default-border no-scrollbar" >
                <div style={{backgroundColor: stringToHexColor(props.name)+"a0"}} className={`px-4 py-3 border-b border-default-border rounded-t-lg`}>
                    <div className="flex items-center justify-between">
                        {!editStatus
                            ?
                            <span
                                className={"font-semibold select-none"}
                                onClick={() => setEditStatus(true)}
                            >
                            {props.name}
                        </span>
                            :
                            <div className={"flex gap-3"}>
                                <Input value={props.name}/>
                                <Button size={"sm"}>OK</Button>
                                <Button size={"sm"} onClick={() => setEditStatus(false)}>Cancel</Button>
                            </div>
                        }
                    </div>
                </div>
                <div ref={ref} className="flex-1 p-3 space-y-3 overflow-y-auto no-scrollbar">
                    {props.tasks && props.tasks.length > 0 && props.tasks.map((task: Task) => (
                        <KanbanTask
                            key={task.uuid}
                            task={task}
                            onClick={() => props.setSelectedTask(task)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}