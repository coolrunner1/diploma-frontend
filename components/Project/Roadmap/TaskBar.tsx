"use client";

import { Task } from "@/types/task";
import { cn } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Global/ui/avatar";
import { Badge } from "@/components/Global/Misc/Badge";
import { getTaskPosition, getPriorityBorder } from "@/utils/roadmapUtils";

type Props = {
    task: Task;
    timelineStart: Date;
    dayWidth: number;
    setSelectedTask: (task: Task) => void;
};

export function TaskBar({
                            task,
                            timelineStart,
                            dayWidth,
                            setSelectedTask,
                        }: Props) {
    const position = getTaskPosition(task, timelineStart, dayWidth);

    if (!position) return null;

    return (
        <div
            className={cn(
                "absolute h-12 rounded-lg shadow-md overflow-hidden group cursor-pointer",
                getPriorityBorder(task.priority)
            )}
            style={{
                left: position.left,
                width: position.width,
                top: `${task.position * 56}px`,
            }}
            onClick={() => setSelectedTask(task)}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundColor: task.status.bgColor,
                }}
            />

            <div className="relative z-10 h-full flex items-center justify-between px-3 text-white">
                <div className="flex items-center gap-2 min-w-0">
                    <Badge className="bg-white/90 text-black text-xs">
                        {task.type}
                    </Badge>

                    <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                            {task.title}
                        </div>

                        {task.description && (
                            <div className="text-[10px] text-white/80 truncate">
                                {task.description}
                            </div>
                        )}
                    </div>
                </div>

                {task.assignee && (
                    <Avatar className="w-6 h-6 border border-white shrink-0">

                        <AvatarFallback>
                            {task.assignee.name[0]}
                        </AvatarFallback>
                    </Avatar>
                )}
            </div>
        </div>
    );
}