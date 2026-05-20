"use client";

import { Task } from "@/types/task";
import { getTaskPosition } from "@/utils/roadmapUtils";
import {TaskBar} from "@/components/Project/Roadmap/TaskBar";

type Props = {
    tasks: Task[];
    timelineStart: Date;
    dayWidth: number;
    setSelectedTask: (task: Task) => void;
};

export function ProjectLane({
                                tasks,
                                timelineStart,
                                dayWidth,
                                setSelectedTask,
                            }: Props) {
    return (
        <div className="flex h-full relative">
            <div className="relative flex-1 min-h-30">
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {tasks.map((task) => {
                        if (!task.blockedBy) return null;

                        const from = tasks.find(
                            (t) => t.id === task.blockedBy
                        );

                        if (!from) return null;

                        const fromPos = getTaskPosition(
                            from,
                            timelineStart,
                            dayWidth
                        );

                        const toPos = getTaskPosition(
                            task,
                            timelineStart,
                            dayWidth
                        );

                        if (!fromPos || !toPos) return null;

                        const x1 = fromPos.left + fromPos.width;
                        const y1 = from.position * 56 + 24;

                        const x2 = toPos.left;
                        const y2 = task.position * 56 + 24;

                        const midX = (x1 + x2) / 2;

                        return (
                            <path
                                key={`${task.id}-dep`}
                                d={`
                                    M ${x1} ${y1}
                                    C ${midX} ${y1},
                                      ${midX} ${y2},
                                      ${x2} ${y2}
                                `}
                                stroke="#94a3b8"
                                strokeWidth="2"
                                fill="none"
                                markerEnd="url(#arrow)"
                            />
                        );
                    })}

                    <defs>
                        <marker
                            id="arrow"
                            markerWidth="10"
                            markerHeight="10"
                            refX="8"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <path
                                d="M0,0 L0,6 L9,3 z"
                                fill="#94a3b8"
                            />
                        </marker>
                    </defs>
                </svg>

                <div className="relative z-10">
                    {tasks.map((task) => (
                        <TaskBar
                            key={task.id}
                            task={task}
                            timelineStart={timelineStart}
                            setSelectedTask={setSelectedTask}
                            dayWidth={dayWidth}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}