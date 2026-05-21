"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { NavBar } from "@/components/Global/Headers/NavBar";
import { useQueryWithErrorQueue } from "@/hooks/useQueryWithErrorQueue";
import { getProjectBoard } from "@/api/projects";

import { Card } from "@/components/Global/ui/card";
import { Button } from "@/components/Global/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/components/Global/ui/avatar";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { priorityHexColors } from "@/constants/colors";
import { SomethingWentWrongText } from "@/components/Global/Misc/SomethingWentWrongText";
import { Badge } from "@/components/Global/Misc/Badge";
import {HeaderButtonContainer} from "@/components/Global/Buttons/HeaderButtonContainer";
import {CalendarHeader} from "@/components/Project/Calendar/CalendarHeader";
import {getWeekDaysByLocale} from "@/utils/utils";
import {CalendarTask} from "@/components/Project/Calendar/CalendarTask";
import {Task} from "@/types/task";
import {TaskDetail} from "@/components/Project/Forms/TaskDetail";

export default function ProjectCalendarPage() {
    const { locale, projectId } = useParams();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const {
        data: board,
        isLoading,
        isError,
    } = useQueryWithErrorQueue({
        queryKey: ["_board", projectId],
        queryFn: getProjectBoard,
    });

    const tasks = board?.tasks ?? [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = useMemo(
        () => new Date(year, month, 1),
        [year, month],
    );

    const startDate = useMemo(() => {
        const date = new Date(firstDay);
        date.setDate(date.getDate() - date.getDay());
        return date;
    }, [firstDay]);

    const calendarDays = useMemo(() => {
        const days: Date[] = [];

        const iter = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            days.push(new Date(iter));
            iter.setDate(iter.getDate() + 1);
        }

        return days;
    }, [startDate]);

    const getTasksForDate = (date: Date) => {
        return tasks.filter((task) => {
            if (!task.endTimestamp) return false;

            const taskDate = new Date(task.endTimestamp);

            return (
                taskDate.getDate() === date.getDate() &&
                taskDate.getMonth() === date.getMonth() &&
                taskDate.getFullYear() === date.getFullYear()
            );
        });
    };

    const isToday = (date: Date) => {
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === month;
    };

    return (
        <NavBar>
            <div className={`flex flex-col h-full`}>
                <CalendarHeader
                    title={board?.title}
                    isLoading={isLoading}
                    year={year}
                    month={month}
                    setCurrentDate={setCurrentDate}
                    currentDate={currentDate}
                />

                {isError && <SomethingWentWrongText />}

                {isLoading && (
                    <div className="w-full h-full mx-6 mt-6 bg-gray-300 dark:bg-gray-700 animate-pulse">
                    </div>
                )}

                {!isLoading && board && (
                    <>
                        {selectedTask &&
                            <TaskDetail
                                task={selectedTask}
                                setClosed={() => setSelectedTask(null)}
                            />
                        }
                        <div className="overflow-scroll p-6">
                            <Card className="overflow-hidden min-w-3xl">
                                <div className="grid grid-cols-7 border-b border-default-border">
                                    {getWeekDaysByLocale(String(locale)).map((day) => (
                                        <div
                                            key={day}
                                            className="p-3 text-center text-sm font-semibold border-r border-default-border last:border-r-0"
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="grid grid-cols-7 auto-rows-fr"
                                    style={{ minHeight: 700 }}
                                >
                                    {calendarDays.map((date, index) => {
                                        const dayTasks =
                                            getTasksForDate(date);

                                        const currentMonthDay =
                                            isCurrentMonth(date);

                                        const todayDay =
                                            isToday(date);

                                        return (
                                            <div
                                                key={index}
                                                className={`
                                                    min-h-35
                                                    border-r
                                                    border-b
                                                    border-default-border
                                                    p-2
                                                    overflow-hidden
                                                    ${
                                                    currentMonthDay
                                                        ? "bg-container"
                                                        : "bg-background"
                                                }
                                                `}
                                            >

                                                <div className="flex justify-between mb-2 ">
                                                    <span
                                                        className={`
                                                            text-sm
                                                            font-medium
                                                            ${
                                                            !currentMonthDay
                                                                ? "text-muted-foreground"
                                                                : ""
                                                        }
                                                        `}
                                                    >
                                                        {todayDay ? (
                                                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground">
                                                                {date.getDate()}
                                                            </span>
                                                        ) : (
                                                            date.getDate()
                                                        )}
                                                    </span>

                                                    {dayTasks.length > 0 && (
                                                        <Badge>
                                                            {dayTasks.length}
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="space-y-2">

                                                    {dayTasks
                                                        .slice(0, 3)
                                                        .map((task) => (
                                                            <CalendarTask
                                                                key={task.uuid}
                                                                task={task}
                                                                setSelectedTask={setSelectedTask}
                                                            />
                                                        ))}

                                                    {dayTasks.length > 3 && (
                                                        <div className="text-xs text-center text-muted-foreground py-1">
                                                            +
                                                            {
                                                                dayTasks.length -
                                                                3
                                                            }{" "}
                                                            more
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </NavBar>
    );
}