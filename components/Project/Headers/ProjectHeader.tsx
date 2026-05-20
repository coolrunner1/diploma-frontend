import { SearchBar } from "@/components/Global/Inputs/SearchBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/Global/ui/select";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    useSearchParams,
    useRouter,
    usePathname, useParams
} from "next/navigation";
import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";
import {getStatuses} from "@/api/statuses";

export const ProjectHeader = () => {
    const t = useTranslations("ProjectHeader");

    const router = useRouter();
    const pathname = usePathname();
    const {projectId} = useParams();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || ""
    );

    const [filterType, setFilterType] = useState(
        searchParams.get("type") || "all"
    );

    const [filterStatus, setFilterStatus] = useState(
        searchParams.get("status") || "all"
    );

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const {data: statuses} = useQueryWithErrorQueue({
        queryKey: ["_statuses", projectId],
        queryFn: getStatuses,
    })

    return (
        <div className="bg-container shadow-lg p-4">
            <div className="flex items-center justify-between mb-4"></div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                    <SearchBar
                        placeholder={t("search")}
                        value={searchQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                        }}
                        keyPressHandler={(e) => {
                            if (e.key === "Enter") {
                                updateQuery("search", searchQuery);
                            }
                        }}
                    />
                </div>

                <Select
                    value={filterType}
                    onValueChange={(value) => {
                        setFilterType(value);
                        updateQuery("type", value);
                    }}
                >
                    <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder={t("filter-by-type")} />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">{t("all-types")}</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filterStatus}
                    onValueChange={(value) => {
                        setFilterStatus(value);
                        updateQuery("status", value);
                    }}
                >
                    <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder={t("filter-by-status")} />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">
                            {t("all-statuses")}
                        </SelectItem>

                        {statuses && statuses.length > 0 && statuses.map((status) => (
                            <SelectItem
                                key={status.uuid + "filter"}
                                value={String(status.id)}
                            >
                                {status.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};