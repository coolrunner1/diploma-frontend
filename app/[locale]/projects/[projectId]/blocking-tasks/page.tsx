"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/Global/ui/card';
import {AlertCircle} from 'lucide-react';
import {useEffect, useMemo} from 'react';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    MarkerType,
    Node,
    Position,
    useEdgesState,
    useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import {Task} from "@/types/task";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {useParams, useSearchParams} from "next/navigation";
import {getTasks} from "@/api/tasks";
import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";
import {TaskNode} from "@/components/Project/BlockingTasksMap/TaskNode";
import {generateArrayOfUUIDs} from "@/utils/generators";
import {useTranslations} from "next-intl";
import {SomethingWentWrongText} from "@/components/Global/Misc/SomethingWentWrongText";

const nodeTypes = {
    taskNode: TaskNode,
};

export default function BlockingTasks() {
    const t = useTranslations("BlockingTasks")

    const {projectId} = useParams();

    const searchParams = useSearchParams();
    const emphasizedTask = searchParams.get("task");

    const {data: tasks, isLoading, isError} = useQueryWithErrorQueue({
        queryFn: getTasks,
        queryKey: ["_tasks", projectId]
    })

    const initialData = useMemo(() => {
        if (!tasks || tasks.length === 0) {
            return {
                nodes: [],
                edges: [],
                stats: {
                    blockingTasks: 0,
                    blockedTasks: 0,
                    criticalBlockers: 0,
                },
            };
        }

        const incompleteTasks = tasks.filter((t) => !t.status.final);

        const blockingTaskIds = new Set<number>();
        const allRelatedTaskIds = new Set<number>();

        const blockingMap = new Map<number, Task[]>();

        incompleteTasks.forEach((task) => {
            if (!task.blockedBy) return;

            const blocker = tasks.find((t) => t.id === task.blockedBy);

            if (blocker && !blocker.status.final) {
                blockingTaskIds.add(blocker.id);

                allRelatedTaskIds.add(blocker.id);
                allRelatedTaskIds.add(task.id);

                if (!blockingMap.has(blocker.id)) {
                    blockingMap.set(blocker.id, []);
                }

                blockingMap.get(blocker.id)!.push(task);
            }
        });

        const blockingTasks = tasks.filter((t) =>
            blockingTaskIds.has(t.id)
        );

        const relatedTasks = tasks.filter((t) =>
            allRelatedTaskIds.has(t.id)
        );

        const graphNodes: Node[] = [];
        const graphEdges: Edge[] = [];

        const blockerNodes = relatedTasks.filter((t) =>
            blockingTaskIds.has(t.id)
        );

        const blockedNodes = relatedTasks.filter(
            (t) =>
                !blockingTaskIds.has(t.id) &&
                allRelatedTaskIds.has(t.id)
        );

        blockerNodes.forEach((task, index) => {
            graphNodes.push({
                id: String(task.id),
                type: "taskNode",
                position: {
                    x: 50,
                    y: index * 200 + 50,
                },
                data: {
                    ...task,
                    isBlocker: true,
                    emphasized: Number(emphasizedTask) === task.id
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
        });

        blockedNodes.forEach((task, index) => {
            graphNodes.push({
                id: String(task.id),
                type: "taskNode",
                position: {
                    x: 450,
                    y: index * 200 + 50,
                },
                data: {
                    ...task,
                    isBlocker: false,
                    emphasized: Number(emphasizedTask) === task.id
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
        });

        relatedTasks.forEach((task) => {
            if (!task.blockedBy) return;

            const blocker = tasks.find(
                (t) => t.id === task.blockedBy
            );

            if (
                blocker &&
                !blocker.status.final &&
                allRelatedTaskIds.has(blocker.id)
            ) {
                graphEdges.push({
                    id: `${blocker.id}-${task.id}`,
                    source: String(blocker.id),
                    target: String(task.id),
                    type: "smoothstep",
                    animated: true,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                    },
                    style: {
                        strokeWidth: 2,
                        stroke: "#f97316",
                    },
                });
            }
        });

        return {
            nodes: graphNodes,
            edges: graphEdges,
            stats: {
                blockingTasks: blockingTasks.length,
                blockedTasks: blockedNodes.length,
                criticalBlockers: blockingTasks.filter(
                    (t) =>
                        t.priority === "critical" ||
                        t.priority === "high"
                ).length,
            },
        };
    }, [tasks]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

    useEffect(() => {
        setNodes(initialData.nodes);
        setEdges(initialData.edges);
    }, [initialData]);

    const {blockingTasks: totalBlockers, blockedTasks, criticalBlockers} = initialData.stats;

    return (
        <NavBar>
            {isError && !tasks &&
                <SomethingWentWrongText/>
            }
            <div className="h-full flex flex-col">
                <div className="p-6 border-b">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{t("blocking-tasks")}</h1>
                        </div>
                        <p className="mb-4">
                            {t("description")}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {isLoading && generateArrayOfUUIDs(3).map((value) =>
                                <Card key={value} className="h-25 animate-pulse">
                                </Card>
                            )}
                            {!isLoading && !isError &&
                                <>
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>{t("total-blocking")}</CardDescription>
                                            <CardTitle className="text-3xl">{totalBlockers}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>{t("total-blocked")}</CardDescription>
                                            <CardTitle className="text-3xl">{blockedTasks}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>{t("total-critical")}</CardDescription>
                                            <CardTitle className="text-3xl">{criticalBlockers}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {isLoading && <div className={"h-full w-full bg-container animate-pulse"}></div>}
                    {!isLoading && nodes.length === 0 && (
                        <div className="h-full flex items-center justify-center">
                            <Card className="max-w-md">
                                <CardContent className="py-12 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <AlertCircle className="w-12 h-12"/>
                                        <p className="text-lg font-medium">{t("not-found")}</p>
                                        <p className="text-sm">{t("not-found-description")}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    {nodes.length > 0 && (
                        <div className="h-full relative">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                nodeTypes={nodeTypes}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                nodesDraggable={true}
                                nodesConnectable={false}
                                elementsSelectable={true}
                                fitView
                                minZoom={0.5}
                                maxZoom={1.5}
                                defaultViewport={{x: 50, y: 50, zoom: 0.8}}
                            >
                                <Background variant={BackgroundVariant.Dots} gap={16} size={1}/>
                                <Controls/>
                            </ReactFlow>
                        </div>
                    )}
                </div>
            </div>
        </NavBar>
    );
}
