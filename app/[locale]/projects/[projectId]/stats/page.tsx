"use client";

import {useParams} from "next/navigation";
import {useMemo} from "react";
import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";
import {getProjectBoard} from "@/api/projects";
import {NavBar} from "@/components/Global/Headers/NavBar";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/Global/ui/card";

import {Progress} from "@/components/Global/ui/progress";
import {Avatar, AvatarFallback} from "@/components/Global/ui/avatar";

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {Users} from "lucide-react";
import {priorityHexColors, taskTypeHexColors} from "@/constants/colors";
import {User} from "@/types/user";
import {SomethingWentWrongText} from "@/components/Global/Misc/SomethingWentWrongText";
import {StatsLoading} from "@/components/Project/Stats/StatsLoading";
import {useTranslations} from "next-intl";

export default function ProjectStatsPage() {
    const {projectId} = useParams<{ projectId: string }>();
    const t = useTranslations("Stats")

    const {data: board, isLoading, isError} = useQueryWithErrorQueue({
        queryKey: ["_board", projectId],
        queryFn: getProjectBoard,
        enabled: !!projectId,
    });

    const tasks = board?.tasks ?? [];
    const statuses = board?.statuses ?? [];

    const taskTypeOrder = ["task", "bug", "story", "epic"];

    const totalTasks = tasks.length;

    const completedTasks = useMemo(() => {
        return tasks.filter((t) => t.status?.final).length;
    }, [tasks]);

    const completionRate = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    const statusData = useMemo(() => {
        return statuses.map((status) => ({
            id: status.id,
            name: status.title,
            value: tasks.filter((t) => t.status?.id === status.id).length,
            color: status.bgColor,
        }));
    }, [statuses, tasks]);

    const overdueTasks = useMemo(() => {
        const now = new Date();

        return tasks.filter((t) => {
            if (t.status?.final) return false;
            if (!t.endTimestamp) return false;

            return new Date(t.endTimestamp) < now;
        }).length;
    }, [tasks]);

    const priorityData = useMemo(() => {
        const map = new Map<string, number>();

        for (const t of tasks) {
            map.set(t.priority, (map.get(t.priority) ?? 0) + 1);
        }

        return Array.from(map.entries()).map(([name, value]) => ({
            name,
            value,
        }));
    }, [tasks]);

    const typeData = useMemo(() => {
        const map = new Map<string, number>();

        for (const t of tasks) {
            map.set(t.type, (map.get(t.type) ?? 0) + 1);
        }

        return taskTypeOrder.map((key) => ({
            name: key,
            value: map.get(key) ?? 0,
        }));
    }, [tasks]);

    const teamData = useMemo(() => {
        const map = new Map<
            string,
            {
                key: string;
                name: string;
                surname: string;
                bgColor: string;
                completed: number;
                active: number;
            }
        >();

        const add = (key: string, user: User) => {
            if (!map.has(key)) {
                map.set(key, {
                    key,
                    name: user.name,
                    surname: user.surname,
                    bgColor: user.bgColor,
                    completed: 0,
                    active: 0,
                });
            }
        };

        for (const t of tasks) {
            if (t.assignee) {
                add(String(t.assignee.id), t.assignee);

                const entry = map.get(String(t.assignee.id))!;
                if (t.status?.final) entry.completed++;
                else entry.active++;
            } else {
                const key = "unassigned";
                if (!map.has(key)) {
                    map.set(key, {
                        key,
                        name: "Unassigned",
                        surname: "",
                        bgColor: "#999",
                        completed: 0,
                        active: 0,
                    });
                }

                const entry = map.get(key)!;
                if (t.status?.final) entry.completed++;
                else entry.active++;
            }
        }

        return Array.from(map.values());
    }, [tasks]);

    return (
        <NavBar>
            <div className="p-6 space-y-6 overflow-y-scroll">

                {isError && <SomethingWentWrongText/>}

                {isLoading &&
                    <StatsLoading/>
                }

                {!isLoading && board &&
                    <>
                        <div>
                            <h1 className="text-2xl font-semibold">{board.title}</h1>
                            <p className="text-sm text-gray-500">
                                {t("overview")}
                            </p>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardDescription>{t("total-tasks")}</CardDescription>
                                    <CardTitle>{totalTasks}</CardTitle>
                                </CardHeader>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardDescription>{t("completed")}</CardDescription>
                                    <CardTitle>{completedTasks}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Progress value={completionRate}/>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardDescription>{t("completion-rate")}</CardDescription>
                                    <CardTitle>{completionRate}%</CardTitle>
                                </CardHeader>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardDescription>{t("overdue-tasks")}</CardDescription>
                                    <CardTitle className="text-red-600">
                                        {overdueTasks}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("task-statuses")}</CardTitle>
                                    <CardDescription>{t("workflow-distribution")}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={statusData}
                                                dataKey="value"
                                                nameKey="name"
                                                outerRadius={100}
                                                label
                                            >
                                                {statusData.map((s) => (
                                                    <Cell key={s.id} fill={s.color}/>
                                                ))}
                                            </Pie>
                                            <Tooltip/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("priority")}</CardTitle>
                                    <CardDescription>{t("task-priority-distribution")}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={priorityData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                                {priorityData.map((entry) => (
                                                    <Cell
                                                        key={entry.name}
                                                        fill={
                                                            priorityHexColors[
                                                                entry.name as keyof typeof priorityHexColors
                                                                ] ?? "#6366f1"
                                                        }
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("task-types")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={typeData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                                {typeData.map((entry) => (
                                                    <Cell
                                                        key={entry.name}
                                                        fill={
                                                            taskTypeHexColors[
                                                                entry.name as keyof typeof taskTypeHexColors
                                                                ] ?? "#22c55e"
                                                        }
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("progress-trend")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={statusData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                fill="#60a5fa"
                                                stroke="#3b82f6"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-4 h-4"/>
                                    {t("team-workload")}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {teamData.map((u) => (
                                    <div key={u.key} className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarFallback title={u.name[0]+u.surname[0]} style={{background: u.bgColor}}/>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm">
                                                <span className={"my-auto"}>
                                                  {u.name} {u.surname}
                                                </span>
                                                <span className="text-gray-500">
                                                  {u.completed} {t("done")} / {u.active} {t("active")}
                                                </span>
                                            </div>

                                            <Progress
                                                value={
                                                    u.completed + u.active === 0
                                                        ? 0
                                                        : (u.completed /
                                                            (u.completed + u.active)) *
                                                        100
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </>
                }
            </div>
        </NavBar>
    );
}