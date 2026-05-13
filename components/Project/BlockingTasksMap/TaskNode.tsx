import {TaskNodeData} from "@/types/task";
import {Handle, Position} from "reactflow";
import {priorityBorderColors} from "@/constants/colors";
import {Badge} from "@/components/Global/Misc/Badge";
import {Lock} from "lucide-react";
import {useTranslations} from "next-intl";

export const TaskNode = ({data}: { data: TaskNodeData }) => {
    const t = useTranslations();

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-orange-500"
            />

            <div
                className={`px-4 py-3 rounded-lg border-2 shadow-md min-w-62.5 max-w-75 bg-container ${
                    data.emphasized ? "animate-bounce" : ""} ${
                    priorityBorderColors[data.priority]
                }`}
            >
                <div className="flex items-start justify-between gap-2 mb-2">
                    {data.isBlocker && (
                        <Badge
                            className="flex bg-orange-100 text-orange-700 text-xs"
                        >
                            <Lock className="w-3 h-3 mr-1 my-auto"/>
                            {t("BlockingTasks.blocker")}
                        </Badge>
                    )}
                </div>

                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {data.title}
                </h3>

                <div className="flex flex-wrap gap-1">
                    <Badge style={{backgroundColor: data.status.bgColor}} className={`text-xs`}>
                        {data.status.title}
                    </Badge>

                    <Badge className="text-xs">
                        {t(`Tasks.Priorities.${data.priority}`)}
                    </Badge>
                </div>

                <div className="mt-2 text-xs text-gray-600 truncate">
                    {data.assignee
                        ?
                        data.assignee.surname + ' ' + data.assignee.name
                        :
                        t('Tasks.unassigned')
                    }
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-orange-500"
            />
        </>
    );
}