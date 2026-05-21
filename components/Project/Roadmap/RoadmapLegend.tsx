"use client";

import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";
import {getStatuses} from "@/api/statuses";
import {useTranslations} from "next-intl";
import {useParams} from "next/navigation";

export function RoadmapLegend() {
    const t = useTranslations();

    const {projectId} = useParams();

    const {data: statuses} = useQueryWithErrorQueue({
        queryKey: ["_statuses", projectId],
        queryFn: getStatuses,
    })

    return (
        <div className="border-t bg-container p-4 flex md:flex-wrap gap-6 text-sm overflow-x-scroll">
            {statuses &&
                <>
                    <div className="font-semibold my-auto">
                        {t("Tasks.status")}
                    </div>

                    {statuses?.map((status) => (
                        <div key={status.uuid} className="flex items-center gap-2">
                            <div style={{backgroundColor: status.bgColor}} className="w-3 h-3 rounded" />
                            <span>{status.title}</span>
                        </div>
                    ))}
                </>
            }

            <div className="ml-6 font-semibold my-auto">
                {t("Tasks.priority")}
            </div>

            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-red-600" />
                <span>{t("Tasks.Priorities.critical")}</span>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500" />
                <span>{t("Tasks.Priorities.high")}</span>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-yellow-500" />
                <span>{t("Tasks.Priorities.medium")}</span>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-cyan-500" />
                <span>{t("Tasks.Priorities.low")}</span>
            </div>
        </div>
    );
}