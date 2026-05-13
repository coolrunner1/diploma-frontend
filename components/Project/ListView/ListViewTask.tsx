import {TableCell, TableRow} from "@/components/Global/ui/table";
import {AlertCircle, Calendar} from "lucide-react";
import {stringToHexColor} from "@/utils/utils";
import {Task} from "@/types/task";
import {priorityTextColors} from "@/constants/colors";
import {useParams} from "next/navigation";
import {Badge} from "@/components/Global/Misc/Badge";
import {useTranslations} from "next-intl";

export type ListViewTaskProps = {
    task: Task;
    setSelectedTask: (task: Task) => void;
}

export const ListViewTask = (props: ListViewTaskProps) => {
    const t = useTranslations()
    const params = useParams();
    const locale = params.locale;

    return (
        <TableRow
            className="cursor-pointer hover:bg-hover"
            onClick={() => props.setSelectedTask(props.task)}
        >
            <TableCell>
                <span className="font-mono text-sm">{props.task.type}</span>
            </TableCell>
            <TableCell>
                <div>
                    <p className="font-medium">{props.task.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {props.task?.tags && props.task.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag.uuid}>
                                {tag.title}
                            </Badge>
                        ))}
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge style={{backgroundColor: props.task.status.bgColor}}>
                    {props.task.status.title}
                </Badge>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <AlertCircle className={`w-4 h-4 ${priorityTextColors[props.task.priority]}`} />
                    <span className="text-sm capitalize">{t(`Tasks.Priorities.${props.task.priority}`)}</span>
                </div>
            </TableCell>
            <TableCell>
                {/*task.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )*/}
            </TableCell>
            <TableCell>
                {props.task.endTimestamp ? (
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(props.task.endTimestamp).toLocaleDateString(locale, {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                ) : (
                    <span className="text-sm text-gray-400">-</span>
                )}
            </TableCell>
        </TableRow>
    )
}