import {HeaderButtonContainer} from "@/components/Global/Buttons/HeaderButtonContainer";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useTranslations} from "next-intl";
import {useParams} from "next/navigation";

export type CalendarHeaderProps = {
    isLoading: boolean;
    title?: string;
    year: number;
    month: number;
    setCurrentDate: (date: Date) => void;
    currentDate: Date;
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
    const t = useTranslations();
    const { locale } = useParams();

    const goToPreviousMonth = () => {
        props.setCurrentDate(new Date(props.year, props.month - 1, 1));
    };

    const goToNextMonth = () => {
        props.setCurrentDate(new Date(props.year, props.month + 1, 1));
    };

    const goToToday = () => {
        props.setCurrentDate(new Date());
    };

    return (
        <div className="shadow-lg p-6 bg-container">

            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    {props.isLoading ? <div className={"p-4 max-w-96 bg-gray-300 dark:bg-gray-700 animate-pulse"}></div> : props.title}
                </h1>

                <p className="text-sm text-muted-foreground">
                    {t("calendar")}
                </p>
            </div>

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <HeaderButtonContainer
                        type={"big"}
                        onClick={goToPreviousMonth}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </HeaderButtonContainer>

                    <HeaderButtonContainer
                        type={"big"}
                        onClick={goToNextMonth}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </HeaderButtonContainer>

                    <h2 className="ml-3 text-lg font-semibold">
                        {props.currentDate.toLocaleDateString(
                            locale,
                            {
                                month: "long",
                                year: "numeric",
                            },
                        )}
                    </h2>
                </div>

                <HeaderButtonContainer
                    type={"big"}
                    onClick={goToToday}
                >
                    {t("today")}
                </HeaderButtonContainer>
            </div>
        </div>
    )
}