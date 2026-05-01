import {Task} from "@/types/task";
import {useDraggable} from "@dnd-kit/react";
import {Calendar, MessageSquare} from "lucide-react";
import {Badge} from "@/components/Global/Misc/Badge";
import {useRouter} from "next/router";
import {useEffect} from "react";

export type KanbanTaskProps = {
    task: Task;
    onClick: (task: Task) => void;
};

const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
};

// todo: change icons to svgs
const typeIcons = {
    task: '📋',
    bug: '🐛',
    story: '📖',
    epic: '🚀',
};

export const KanbanTask = (props: KanbanTaskProps) => {

    const {ref} = useDraggable({
        id: props.task.uuid,
        type: "task",
    })

    return (
        <div
            ref={ref}
            className="border bg-background border-default-border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer group select-none"
            onClick={() => props.onClick(props.task)}
        >
            <div className="flex items-start gap-2 mb-2">
                {/*<span className="text-lg">{typeIcons[props.task.type]}</span>*/}
                <div className="flex flex-row min-w-0">
                    <p className="text-sm line-clamp-2 group-hover:text-blue-600">
                        {props.task.name}
                    </p>
                    <div className={`w-1.5 h-1.5 m-auto ml-2 rounded-full ${priorityColors[props.task.priority]}`} />
                </div>
            </div>

            {/*
            <div className={`mb-2 w-[25%] rounded-full text-center ${priorityColors[props.task.priority]}`}>
                <span className="text-xs font-mono ">{props.task.priority}</span>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[props.task.priority]}`} />
            */}
            <div className="flex flex-wrap gap-1 mb-3">
                {props.task.tags && props.task.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={tag+index+props.task.uuid}>
                        {tag}
                    </Badge>
                    ))
                }
                {props.task.tags && props.task.tags.length > 2 && (
                    <Badge>
                        +{props.task.tags.length - 2}
                    </Badge>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    {props.task.messageCount > 0 &&
                        <>
                            <MessageSquare className="w-3 h-3" />
                            <span>{props.task.messageCount}</span>
                        </>
                    }
                    {props.task.endTimestamp && (
                        <>
                            <Calendar className="w-3 h-3 ml-1" />
                            {/*TODO: detect the current locale*/}
                            <span>{new Date(props.task.endTimestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </>
                    )}
                </div>
                {/*task.assignee && (
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                    </Avatar>
                )*/}
            </div>
        </div>
    )
}