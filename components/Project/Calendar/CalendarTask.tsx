import {Avatar, AvatarFallback} from "@/components/Global/ui/avatar";
import {priorityHexColors} from "@/constants/colors";
import {Task} from "@/types/task";

export type CalendarTaskProps = {
    task: Task;
    setSelectedTask: (task: Task | null) => void;
}

export const CalendarTask = (props: CalendarTaskProps) => {
    return (
        <div
            className="rounded-md border p-2 cursor-pointer bg-container hover:bg-muted/40 transition-colors"
            style={{
                borderLeftWidth:
                    "4px",
                borderLeftColor:
                    priorityHexColors[
                        props.task.priority
                        ] ??
                    "#6366f1",
                borderRightColor: props.task.status.bgColor,
                borderTopColor: props.task.status.bgColor,
                borderBottomColor: props.task.status.bgColor,
            }}
            onClick={() => {props.setSelectedTask(props.task)}}
        >
            <p className="text-xs font-medium line-clamp-2">
                {
                    props.task.title
                }
            </p>

            {props.task.assignee && (
                <div className="mt-2 flex items-center">
                    <Avatar className="w-5 h-5 text-black">
                        <AvatarFallback
                            title={props.task.assignee.name[0] + props.task.assignee.surname[0]}
                            style={{
                                background:
                                props.task
                                    .assignee
                                    .bgColor,
                            }}
                            className="text-[9px]"
                        />
                    </Avatar>
                    <span className="text-xs ml-1 font-medium line-clamp-2">
                        {props.task.assignee.name} {props.task.assignee.surname}
                    </span>
                </div>
            )}
        </div>
    )
}