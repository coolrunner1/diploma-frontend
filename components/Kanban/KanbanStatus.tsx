import {Task} from "@/types/task";
import {KanbanTask} from "@/components/Kanban/KanbanTask";
import {useDroppable} from "@dnd-kit/react";
import {useTranslations} from "next-intl";
import {useState} from "react";

export type KanbanStatusProps = {
    //id: string;
    name: string;
    tasks?: Task[];
}

export const KanbanStatus = (props: KanbanStatusProps) => {
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
            <div ref={ref} className={"flex flex-col justify-between p-3 rounded-md shadow-lg w-72 h-80 mx-auto sm:mx-0 bg-gray-50 dark:bg-gray-800"}>
                <div className={"flex flex-col w-full"}>
                    {!editStatus
                        ?
                        <span
                            className={"text-center select-none"}
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
                    {props.tasks && props.tasks.length > 0 && props.tasks.map((task: Task) => (
                        <KanbanTask
                            key={task.uuid}
                            task={task}
                        />
                    ))}
                </div>
                <button
                    className={"bg-blue-500 rounded-md text-white hover:bg-blue-500 focus:outline-none"}
                    onClick={() => setModal(true)}
                >
                    {t('Project.add-new-task')}
                </button>
            </div>
        </>
    )
}