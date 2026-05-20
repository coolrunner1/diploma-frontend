import { Project } from "@/types/project";

import { Button } from "@/components/Global/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Global/ui/select";

import {
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import {HeaderButtonContainer} from "@/components/Global/Buttons/HeaderButtonContainer";
import {useTranslations} from "next-intl";

type Props = {
    scrollTimeline: (
        direction: "left" | "right"
    ) => void;

    zoomIn: () => void;
    zoomOut: () => void;
};

export function RoadmapHeader({
                                  scrollTimeline,
                                  zoomIn,
                                  zoomOut,
                              }: Props) {
    const t = useTranslations("Timeline");

    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold">
                    {t("roadmap")}
                </h1>

                <p className="text-muted-foreground mt-1">
                    {t("description")}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <HeaderButtonContainer
                    type={"big"}
                    onClick={() =>
                        scrollTimeline(
                            "left"
                        )
                    }
                >
                    <ChevronLeft className="w-4 h-4" />
                </HeaderButtonContainer>

                <HeaderButtonContainer
                    type={"big"}
                    onClick={() =>
                        scrollTimeline(
                            "right"
                        )
                    }
                >
                    <ChevronRight className="w-4 h-4" />
                </HeaderButtonContainer>

                <HeaderButtonContainer
                    type={"big"}
                    onClick={zoomOut}
                >
                    <ZoomOut className="w-4 h-4" />
                </HeaderButtonContainer>

                <HeaderButtonContainer
                    type={"big"}
                    onClick={zoomIn}
                >
                    <ZoomIn className="w-4 h-4" />
                </HeaderButtonContainer>
            </div>
        </div>
    );
}