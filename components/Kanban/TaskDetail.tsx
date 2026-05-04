import {Badge} from '@/components/Global/Misc/Badge';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/Global/FigmaTempVibe/avatar';
import {Separator} from '@/components/Global/FigmaTempVibe/separator';
import {AlertCircle, Calendar, MessageSquare, MoreHorizontal, Paperclip} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/Global/FigmaTempVibe/select";
import {Task} from "@/types/task";
import {Button} from "@/components/Global/FigmaTempVibe/button";
import {useTranslations} from "next-intl";
import {BurgerContainer} from "@/components/Global/Modals/BurgerContainer";


export type TaskDetailProps = {
    task: Task | null;
    setClosed: () => void;
    onStatusChange?: (taskId: string, newStatus: Task['status']) => void;
}

const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
};

const typeLabels = {
    task: 'Task',
    bug: 'Bug',
    story: 'Story',
    epic: 'Epic',
};

export const TaskDetail = (props: TaskDetailProps) => {
    const t = useTranslations("Tasks")

    if (!props.task) return null;

    return (
        <BurgerContainer setClosed={props.setClosed} position={'right'}>
            <div className="w-full sm:max-w-2xl overflow-y-auto p-5">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge>{typeLabels[props.task.type]}</Badge>
                        </div>
                        <div className="text-2xl">{props.task.name}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4"/>
                    </Button>
                </div>

                <div className="mt-6 space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-semibold mb-2">{t('description')}</h3>
                        <div className="text-sm">
                            {props.task.description}
                        </div>
                    </div>

                    <Separator/>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Status */}
                        <div>
                            <label className="text-sm font-semibold mb-2 block">
                                {t('status')}
                            </label>
                            <Select
                                value={props.task.status}
                                onValueChange={(value) => props.onStatusChange?.(props.task.uuid, value as Task['status'])}
                            >
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="backlog">Backlog</SelectItem>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="review">Review</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="text-sm font-semibold mb-2 block">
                                Priority
                            </label>
                            <div className="flex items-center gap-2">
                                <AlertCircle className={`w-4 h-4 ${
                                    props.task.priority === 'critical' ? 'text-red-500' :
                                        props.task.priority === 'high' ? 'text-orange-500' :
                                            props.task.priority === 'medium' ? 'text-yellow-500' :
                                                'text-blue-500'
                                }`}/>
                                <span className="text-sm">{priorityLabels[props.task.priority]}</span>
                            </div>
                        </div>

                        {/* Assignee
        <div>
            <label className="text-sm font-semibold mb-2 block">
            Assignee
            </label>
        {task.assignee ? (
            <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{task.assignee.name}</span>
            </div>
        ) : (
            <Button variant="outline" size="sm" className="w-full justify-start">
        <User className="w-4 h-4 mr-2" />
            Unassigned
            </Button>
        )}
        </div>
        */}
                        {/* Reporter
        <div>
            <label className="text-sm font-semibold mb-2 block">
            Reporter
            </label>
            <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
        <AvatarImage src={task.reporter.avatar} alt={task.reporter.name} />
        <AvatarFallback>{task.reporter.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{task.reporter.name}</span>
            </div>
            </div>
        */}
                        {/* Due Date */}
                        {props.task.endTimestamp && (
                            <div>
                                <label className="text-sm font-semibold mb-2 block">
                                    Due Date
                                </label>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4"/>
                                    {new Date(props.task.endTimestamp).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Created */}
                        <div>
                            <label className="text-sm font-semibold mb-2 block">
                                Created
                            </label>
                            <div className="text-sm">
                                {new Date(props.task.startTimestamp).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </div>
                        </div>
                    </div>

                    <Separator/>

                    {/* Tags */}
                    <div>
                        <h3 className="text-sm font-semibold mb-2">{t('labels')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {props.task.tags && props.task.tags.map((tag) => (
                                <Badge key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Separator/>

                    {/* Comments Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="w-4 h-4"/>
                            <h3 className="text-sm font-semibold">{t('comments')}</h3>
                            <span className="text-sm">(2)</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://i.pravatar.cc/150?img=7"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold">Jane Doe</span>
                                        <span className="text-xs">2 hours ago</span>
                                    </div>
                                    <p className="text-sm">
                                        Looking good! Just a few minor adjustments needed.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                    {/*<AvatarImage src={task.assignee?.avatar}/>
                                        <AvatarFallback>{task.assignee?.name[0]}</AvatarFallback>*/}
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold">{/*task.assignee?.name*/}</span>
                                        <span className="text-xs">1 hour ago</span>
                                    </div>
                                    <p className="text-sm">
                                        Thanks! I&apos;ll make those changes shortly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator/>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Paperclip className="w-4 h-4"/>
                            <h3 className="text-sm font-semibold">{t('attachments')}</h3>
                            <span className="text-sm">(0)</span>
                        </div>
                        <Button variant="outline" size="sm">
                            <Paperclip className="w-4 h-4 mr-2"/>
                            {t('add-attachment')}
                        </Button>
                    </div>
                </div>
            </div>
        </BurgerContainer>
    );
}
