import {
    addMonths,
    differenceInCalendarDays,
    endOfMonth,
    getDaysInMonth,
    max,
    min,
    startOfMonth,
    subMonths,
} from "date-fns";

import { Task } from "@/types/task";

export const buildTimelineRange = (tasks: Task[]) => {
    if (!tasks.length) {
        const now = new Date();

        return {
            start: startOfMonth(subMonths(now, 3)),
            end: endOfMonth(addMonths(now, 9)),
        };
    }

    const dates = tasks.flatMap(task => [
        new Date(task.startTimestamp),
        new Date(task.endTimestamp),
    ]);

    return {
        start: startOfMonth(min(dates)),
        end: endOfMonth(max(dates)),
    };
};

export const getMonthWidth = (
    month: Date,
    dayWidth: number
) => {
    return getDaysInMonth(month) * dayWidth;
};

export const getTaskPosition = (
    task: Task,
    timelineStart: Date,
    dayWidth: number
) => {
    const start = new Date(task.startTimestamp);
    const end = new Date(task.endTimestamp);

    const offsetDays =
        differenceInCalendarDays(
            start,
            timelineStart
        );

    const durationDays =
        differenceInCalendarDays(end, start) + 1;

    return {
        left: offsetDays * dayWidth,
        width: Math.max(
            durationDays * dayWidth,
            100
        ),
    };
};

export const getPriorityBorder = (
    priority: Task["priority"]
) => {
    switch (priority) {
        case "critical":
            return "border-l-4 border-red-700";

        case "high":
            return "border-l-4 border-orange-500";

        case "medium":
            return "border-l-4 border-yellow-500";

        case "low":
            return "border-l-4 border-cyan-500";

        default:
            return "";
    }
};

export const getTaskCenter = (
    position: { left: number; width: number },
    top: number
) => {
    return {
        x: position.left + position.width,
        y: top + 24,
    };
};