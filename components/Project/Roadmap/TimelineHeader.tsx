"use client";

import { format, getDaysInMonth } from "date-fns";

import { getMonthWidth } from "@/utils/roadmapUtils";
import {useParams} from "next/navigation";
import {enUS, ru} from "date-fns/locale";
import {ruNominative} from "@/utils/utils";

type Props = {
    months: Date[];
    dayWidth: number;
};

export function TimelineHeader({
                                   months,
                                   dayWidth,
                               }: Props) {
    const {locale} = useParams();

    return (
        <div className="sticky top-0 z-30 flex border-b border-default-border shadow-sm">
            <div className="flex">
                {months.map(month => (
                    <div
                        key={
                            month.toISOString()
                        }
                        className="border-r border-default-border"
                        style={{
                            width:
                                getMonthWidth(
                                    month,
                                    dayWidth
                                ),
                        }}
                    >
                        <div className="p-3 border-b border-default-border">
                            <div className="font-semibold">
                                {format(
                                    month,
                                    "MMMM yyyy",
                                    {locale: locale === "ru" ? ruNominative : enUS}
                                )}
                            </div>

                            <div className="text-xs mt-1">
                                1-{getDaysInMonth(
                                    month
                                )}{" "}
                            </div>
                        </div>

                        <div className="flex">
                            {Array.from({
                                length:
                                    getDaysInMonth(
                                        month
                                    ),
                            }).map(
                                (_, day) => (
                                    <div
                                        key={
                                            day
                                        }
                                        className="text-[10px] border-r text-center border-default-border"
                                        style={{
                                            width:
                                            dayWidth,
                                        }}
                                    >
                                        {day +
                                            1}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}