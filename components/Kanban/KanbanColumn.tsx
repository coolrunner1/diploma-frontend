import {Task} from "@/types/task";
import {KanbanTask} from "@/components/Kanban/KanbanTask";
import {useDroppable} from "@dnd-kit/react";
import {useTranslations} from "next-intl";
import {useState} from "react";

export type KanbanColumnProps = {
    //id: string;
    name: string;
    tasks?: Task[];
}

export const KanbanColumn = (props: KanbanColumnProps) => {
    const t = useTranslations();
    const [modal, setModal] = useState(false);
    const [editStatus, setEditStatus] = useState(false);

    const {ref} = useDroppable({
        id: props.name,
        type: "status"
    });

    return (
        <>
            {modal && (
                <>
                    modal
                </>
            )}
            <div

                className="flex flex-col w-80 bg-container rounded-lg border border-gray-200"
            >
                <div className={`px-4 py-3 border-b border-gray-200 rounded-t-lg`}>
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
                            <>
                                <input value={props.name}/>
                                <button>OK</button>
                                <button onClick={() => setEditStatus(false)}>Cancel</button>
                            </>
                        }
                    </div>
                </div>
                <div ref={ref} className="flex-1 p-3 space-y-3 overflow-y-auto">
                    {props.tasks && props.tasks.length > 0 && props.tasks.map((task: Task) => (
                        <KanbanTask
                            key={task.uuid}
                            task={task}
                            onClick={() => {}}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}