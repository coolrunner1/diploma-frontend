"use client";

import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { eachMonthOfInterval  } from "date-fns";
import { useQueryWithErrorQueue } from "@/hooks/useQueryWithErrorQueue";
import { getTasks } from "@/api/tasks";
import { Task } from "@/types/task";
import { buildTimelineRange } from "@/utils/roadmapUtils";
import { RoadmapHeader } from "@/components/Project/Roadmap/RoadmapHeader";
import { RoadmapStats } from "@/components/Project/Roadmap/RoadmapStats";
import { TimelineHeader } from "@/components/Project/Roadmap/TimelineHeader";
import { ProjectLane } from "@/components/Project/Roadmap/ProjectLane";
import { RoadmapLegend } from "@/components/Project/Roadmap/RoadmapLegend";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {TaskDetail} from "@/components/Project/Forms/TaskDetail";
import {SomethingWentWrongText} from "@/components/Global/Misc/SomethingWentWrongText";

export default function ProjectTimelinePage() {
    const params = useParams();
    const projectId = Number(params.projectId);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const scrollTimeline = (direction: "left" | "right") => {
        if (!timelineRef.current) return;

        const amount = 600 * zoom;

        timelineRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    const [zoom, setZoom] = useState(1);

    const DAY_WIDTH = 24 * zoom;

    const zoomIn = () => {
        setZoom((z) => Math.min(2.5, z + 0.25));
    };

    const zoomOut = () => {
        setZoom((z) => Math.max(0.5, z - 0.25));
    };

    const { data: tasks = [], isLoading, isError } = useQueryWithErrorQueue<Task[]>({
        queryKey: ["tasks", projectId],
        queryFn: getTasks,
    });

    const { start, end } = useMemo(() => {
        return buildTimelineRange(tasks);
    }, [tasks]);

    const months = useMemo(() => {
        return eachMonthOfInterval({ start, end });
    }, [start, end]);

    const stats = useMemo(() => {
        return {
            total: tasks.length,
            completed: tasks.filter(t => t.status.final).length,
            inProgress: tasks.filter(t => !t.status.final).length,
        };
    }, [tasks]);

    return (
        <NavBar>
            <div className="h-full flex flex-col">
                <div className="p-6 border-b space-y-4 bg-container">
                    <RoadmapHeader
                        scrollTimeline={scrollTimeline}
                        zoomIn={zoomIn}
                        zoomOut={zoomOut}
                    />

                    <RoadmapStats
                        isLoading={isLoading}
                        total={stats.total}
                        completed={stats.completed}
                        inProgress={stats.inProgress}
                    />
                </div>

                {isError && <SomethingWentWrongText/>}

                {isLoading && <div className="h-full bg-container animate-pulse"/>}

                {!isLoading && tasks &&
                    <div ref={timelineRef} className="flex-1 overflow-auto">
                        <div className="min-w-300">
                            <TimelineHeader
                                months={months}
                                dayWidth={DAY_WIDTH}
                            />

                            <ProjectLane
                                tasks={tasks}
                                timelineStart={start}
                                setSelectedTask={setSelectedTask}
                                dayWidth={DAY_WIDTH}
                            />
                        </div>
                    </div>
                }
                <RoadmapLegend />
            </div>
            {selectedTask &&
                <TaskDetail
                    task={selectedTask}
                    setClosed={() => setSelectedTask(null)}
                />
            }
        </NavBar>
    );
}