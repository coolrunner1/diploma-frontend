import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Global/ui/card';
import {AlertCircle, Lock, Info, Badge} from 'lucide-react';
import { useMemo } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    BackgroundVariant,
    MarkerType,
    Position,
    Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import {Task} from "@/types/task";

const projects = [
    {
        id: '1',
        name: 'Marketing Website',
        key: 'MW',
        description: 'New marketing website redesign project',
        icon: '🌐',
    },
    {
        id: '2',
        name: 'Mobile App',
        key: 'MA',
        description: 'iOS and Android mobile application',
        icon: '📱',
    },
    {
        id: '3',
        name: 'API Platform',
        key: 'API',
        description: 'Backend API and infrastructure',
        icon: '⚙️',
    },
];

const tasks = [
    {
        id: 'MW-101',
        title: 'Design new homepage layout',
        description: 'Create a modern, responsive homepage design with hero section, features, and testimonials',
        status: 'in-progress',
        priority: 'high',
        type: 'story',
        assignee: {
            name: 'Sarah Chen',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        reporter: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        dueDate: '2026-04-15',
        createdAt: '2026-03-20',
        projectId: '1',
        tags: ['design', 'frontend'],
    },
    {
        id: 'MW-102',
        title: 'Implement contact form',
        description: 'Add a functional contact form with validation and email integration',
        status: 'todo',
        priority: 'medium',
        type: 'task',
        assignee: {
            name: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        reporter: {
            name: 'Sarah Chen',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        dueDate: '2026-04-18',
        createdAt: '2026-03-22',
        projectId: '1',
        tags: ['frontend', 'forms'],
        blockedBy: ['MW-101'], // Blocked by homepage design
    },
    {
        id: 'MW-103',
        title: 'Fix navigation menu on mobile',
        description: 'Navigation menu not closing properly on mobile devices after clicking a link',
        status: 'review',
        priority: 'high',
        type: 'bug',
        assignee: {
            name: 'Emily Davis',
            avatar: 'https://i.pravatar.cc/150?img=4',
        },
        reporter: {
            name: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        createdAt: '2026-03-25',
        projectId: '1',
        tags: ['bug', 'mobile'],
    },
    {
        id: 'MW-104',
        title: 'Optimize images for performance',
        description: 'Compress and optimize all images to improve page load times',
        status: 'todo',
        priority: 'low',
        type: 'task',
        reporter: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        createdAt: '2026-03-28',
        projectId: '1',
        tags: ['performance', 'optimization'],
        blockedBy: ['MW-101'], // Blocked by homepage design
    },
    {
        id: 'MW-105',
        title: 'Add SEO meta tags',
        description: 'Implement proper SEO meta tags across all pages',
        status: 'backlog',
        priority: 'medium',
        type: 'task',
        reporter: {
            name: 'Sarah Chen',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        createdAt: '2026-03-30',
        projectId: '1',
        tags: ['seo', 'marketing'],
        blockedBy: ['MW-101', 'MW-102'], // Blocked by homepage design and contact form
    },
    {
        id: 'MW-106',
        title: 'Set up analytics tracking',
        description: 'Integrate Google Analytics and set up event tracking for key user interactions',
        status: 'done',
        priority: 'medium',
        type: 'task',
        assignee: {
            name: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        reporter: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        createdAt: '2026-03-15',
        projectId: '1',
        tags: ['analytics', 'tracking'],
    },
    {
        id: 'MA-201',
        title: 'Design onboarding flow',
        description: 'Create user onboarding screens for first-time app users',
        status: 'in-progress',
        priority: 'high',
        type: 'story',
        assignee: {
            name: 'Sarah Chen',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        reporter: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        dueDate: '2026-04-20',
        createdAt: '2026-03-18',
        projectId: '2',
        tags: ['design', 'ux'],
    },
    {
        id: 'MA-202',
        title: 'Implement push notifications',
        description: 'Add push notification support for iOS and Android',
        status: 'todo',
        priority: 'high',
        type: 'task',
        assignee: {
            name: 'Alex Rivera',
            avatar: 'https://i.pravatar.cc/150?img=5',
        },
        reporter: {
            name: 'Emily Davis',
            avatar: 'https://i.pravatar.cc/150?img=4',
        },
        dueDate: '2026-04-25',
        createdAt: '2026-03-21',
        projectId: '2',
        tags: ['mobile', 'notifications'],
        blockedBy: ['MA-201'], // Blocked by onboarding flow design
    },
    {
        id: 'API-301',
        title: 'Upgrade database schema',
        description: 'Update database schema to support new features and improve performance',
        status: 'review',
        priority: 'critical',
        type: 'task',
        assignee: {
            name: 'David Lee',
            avatar: 'https://i.pravatar.cc/150?img=6',
        },
        reporter: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        dueDate: '2026-04-10',
        createdAt: '2026-03-10',
        projectId: '3',
        tags: ['backend', 'database'],
    },
    {
        id: 'API-302',
        title: 'Add rate limiting',
        description: 'Implement rate limiting to prevent API abuse',
        status: 'in-progress',
        priority: 'high',
        type: 'task',
        assignee: {
            name: 'Alex Rivera',
            avatar: 'https://i.pravatar.cc/150?img=5',
        },
        reporter: {
            name: 'David Lee',
            avatar: 'https://i.pravatar.cc/150?img=6',
        },
        createdAt: '2026-03-24',
        projectId: '3',
        tags: ['backend', 'security'],
        blockedBy: ['API-301'], // Blocked by database upgrade
    },
];


function TaskNode({ data }: { data: any }) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical':
                return 'border-red-500 bg-red-50';
            case 'high':
                return 'border-orange-500 bg-orange-50';
            case 'medium':
                return 'border-yellow-500 bg-yellow-50';
            case 'low':
                return 'border-blue-500 bg-blue-50';
            default:
                return 'border-gray-500 bg-gray-50';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done':
                return 'bg-green-100 text-green-700';
            case 'in-progress':
                return 'bg-blue-100 text-blue-700';
            case 'review':
                return 'bg-purple-100 text-purple-700';
            case 'todo':
                return 'bg-gray-100 text-gray-700';
            case 'backlog':
                return 'bg-slate-100 text-slate-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <>
            {/* Incoming connections */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-orange-500"
            />

            <div
                className={`px-4 py-3 rounded-lg border-2 shadow-md bg-white min-w-62.5 max-w-75 ${getPriorityColor(
                    data.priority
                )}`}
            >
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{data.projectIcon}</span>
                        <span className="font-mono text-xs font-semibold text-gray-600">
              {data.id}
            </span>
                    </div>

                    {data.isBlocker && (
                        <Badge
                            className="bg-orange-100 text-orange-700 text-xs"
                        >
                            <Lock className="w-3 h-3 mr-1" />
                            Blocker
                        </Badge>
                    )}
                </div>

                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {data.title}
                </h3>

                <div className="flex flex-wrap gap-1">
                    <Badge className={`${getStatusColor(data.status)} text-xs`}>
                        {data.status}
                    </Badge>

                    <Badge variant="outline" className="text-xs">
                        {data.priority}
                    </Badge>
                </div>

                {data.assignee && (
                    <div className="mt-2 text-xs text-gray-600 truncate">
                        {data.assignee}
                    </div>
                )}
            </div>

            {/* Outgoing connections */}
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-orange-500"
            />
        </>
    );
}
const nodeTypes = {
    taskNode: TaskNode,
};

export default function BlockingTasks() {

    // Calculate blocking tasks and build graph
    const { nodes, edges, stats } = useMemo(() => {
        const incompleteTasks = tasks.filter((t) => t.status !== 'done');
        const blockingTaskIds = new Set<string>();
        const blockingMap = new Map<string, Task[]>();
        const allRelatedTaskIds = new Set<string>();

        // Find all tasks that are blocking incomplete tasks
        incompleteTasks.forEach((task) => {
            if (task.blockedBy && task.blockedBy.length > 0) {
                task.blockedBy.forEach((blockerId) => {
                    const blocker = tasks.find((t) => t.id === blockerId);
                    if (blocker && blocker.status !== 'done') {
                        blockingTaskIds.add(blockerId);
                        allRelatedTaskIds.add(blockerId);
                        allRelatedTaskIds.add(task.id);
                        if (!blockingMap.has(blockerId)) {
                            blockingMap.set(blockerId, []);
                        }
                        blockingMap.get(blockerId)!.push(task);
                    }
                });
            }
        });

        const blockingTasks = tasks.filter((t) => blockingTaskIds.has(t.id));
        const relatedTasks = tasks.filter((t) => allRelatedTaskIds.has(t.id));

        // Create nodes and edges for the graph
        const graphNodes: Node[] = [];
        const graphEdges: Edge[] = [];

        // Position nodes in columns based on whether they're blockers or blocked
        const blockerNodes = relatedTasks.filter((t) => blockingTaskIds.has(t.id));
        const blockedNodes = relatedTasks.filter(
            (t) => !blockingTaskIds.has(t.id) && allRelatedTaskIds.has(t.id)
        );

        // Create nodes for blockers (left column)
        blockerNodes.forEach((task, index) => {
            const project = projects.find((p) => p.id === task.projectId);
            graphNodes.push({
                id: task.id,
                type: 'taskNode',
                position: { x: 50, y: index * 200 + 50 },
                data: {
                    id: task.uuid,
                    title: task.title,
                    status: task.status,
                    priority: task.priority,
                    projectIcon: project?.icon,
                    assignee: task.assignee?.name,
                    isBlocker: true,
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
        });

        // Create nodes for blocked tasks (right column)
        blockedNodes.forEach((task, index) => {
            const project = projects.find((p) => p.id === task.projectId);
            graphNodes.push({
                id: task.id,
                type: 'taskNode',
                position: { x: 450, y: index * 200 + 50 },
                data: {
                    id: task.id,
                    title: task.title,
                    status: task.status,
                    priority: task.priority,
                    projectIcon: project?.icon,
                    assignee: task.assignee?.name,
                    isBlocker: false,
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
        });

        // Create edges
        relatedTasks.forEach((task) => {
            if (task.blockedBy && task.blockedBy.length > 0) {
                task.blockedBy.forEach((blockerId) => {
                    const blocker = tasks.find((t) => t.id === blockerId);
                    if (blocker && blocker.status !== 'done' && allRelatedTaskIds.has(blockerId)) {
                        graphEdges.push({
                            id: `${blockerId}-${task.id}`,
                            source: blockerId,
                            target: task.id,
                            type: 'smoothstep',
                            animated: true,
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                width: 20,
                                height: 20,
                            },
                            style: {
                                strokeWidth: 2,
                                stroke: '#f97316',
                            },
                        });
                    }
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
                    (t) => t.priority === 'critical' || t.priority === 'high'
                ).length,
            },
        };
    }, []);

    const { blockingTasks: totalBlockers, blockedTasks, criticalBlockers } = stats;

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-8 h-8 text-orange-600" />
                        <h1 className="text-3xl font-bold">Blocking Tasks</h1>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Visual dependency graph showing tasks that are preventing other tasks from being completed
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Total Blocking Tasks</CardDescription>
                                <CardTitle className="text-3xl">{totalBlockers}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Tasks Being Blocked</CardDescription>
                                <CardTitle className="text-3xl">{blockedTasks}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Critical Blockers</CardDescription>
                                <CardTitle className="text-3xl">{criticalBlockers}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Graph */}
            <div className="flex-1 bg-gray-50">
                {nodes.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <Card className="max-w-md">
                            <CardContent className="py-12 text-center">
                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                    <AlertCircle className="w-12 h-12" />
                                    <p className="text-lg font-medium">No blocking tasks</p>
                                    <p className="text-sm">All tasks are either done or not blocking anything</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="h-full relative">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            fitView
                            minZoom={0.5}
                            maxZoom={1.5}
                            defaultViewport={{ x: 50, y: 50, zoom: 0.8 }}
                        >
                            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                            <Controls />
                        </ReactFlow>
                        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
                            <div className="flex items-start gap-2">
                                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-semibold mb-1">How to read this graph:</p>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>• Left side: Tasks blocking others</li>
                                        <li>• Right side: Tasks being blocked</li>
                                        <li>• Arrows show dependencies</li>
                                        <li>• Use mouse to pan and zoom</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
