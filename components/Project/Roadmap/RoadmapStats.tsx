"use client";

import { Card } from "@/components/Global/ui/card";
import {useTranslations} from "next-intl";

type Props = {
    isLoading: boolean;
    total: number;
    completed: number;
    inProgress: number;
};

export function RoadmapStats({
                                 total,
                                 completed,
                                 inProgress,
                                 isLoading
                             }: Props) {
    const t = useTranslations("Tasks");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-h-40 md:max-h-max overflow-y-scroll">
            <Card className="p-5 bg-blue-50 dark:bg-blue-300">
                <div className="text-sm text-blue-700">
                    {t('total')}
                </div>

                <div className="text-3xl text-black font-bold mt-2">
                    {isLoading ? <div className={"p-4 max-w-16 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div> : total}
                </div>
            </Card>

            <Card className="p-5 bg-emerald-50 dark:bg-emerald-300">
                <div className="text-sm text-emerald-700">
                    {t('done-tasks')}
                </div>

                <div className="text-3xl text-black font-bold mt-2">
                    {isLoading ? <div className={"p-4 max-w-16 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div> : completed}
                </div>
            </Card>

            <Card className="p-5 bg-orange-50 dark:bg-orange-300">
                <div className="text-sm text-orange-700">
                    {t('in-progress-tasks')}
                </div>

                <div className="text-3xl text-black font-bold mt-2">
                    {isLoading ? <div className={"p-4 max-w-16 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div> : inProgress}
                </div>
            </Card>
        </div>
    );
}