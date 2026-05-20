'use client'
import {useState} from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow,} from '@/components/Global/ui/table';
import {useParams, useSearchParams} from "next/navigation";
import {Task} from "@/types/task";
import {useQuery} from "@tanstack/react-query";
import {TaskDetail} from "@/components/Project/Forms/TaskDetail";
import {NavBar} from "@/components/Global/Headers/NavBar";
import {ProjectHeader} from "@/components/Project/Headers/ProjectHeader";
import {ErrorPopupContainer} from "@/components/Global/Misc/PopupsContainer";
import {ListViewTask} from "@/components/Project/ListView/ListViewTask";
import {generateArrayOfUUIDs} from "@/utils/generators";
import {PlaceholderListViewTask} from "@/components/Project/ListView/PlaceholderListViewTask";
import {v4 as uuidv4} from 'uuid';
import {useTranslations} from "next-intl";
import {getProjectBoard} from "@/api/projects";
import {useQueryWithErrorQueue} from "@/hooks/useQueryWithErrorQueue";
import {SomethingWentWrongText} from "@/components/Global/Misc/SomethingWentWrongText";

const tableHeader = [
    {
        key: uuidv4(),
        className: "w-15",
        title: "type",
    },
    {
        key: uuidv4(),
        className: "",
        title: "ListView.summary",
    },
    {
        key: uuidv4(),
        className: "w-35",
        title: "Tasks.status",
    },
    {
        key: uuidv4(),
        className: "w-30",
        title: "Tasks.priority",
    },
    {
        key: uuidv4(),
        className: "w-30",
        title: "Tasks.assignee",
    },
    {
        key: uuidv4(),
        className: "w-25",
        title: "due-date",
    }
]

export default function Page() {
    const {projectId} = useParams();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const t = useTranslations();

    const searchParams = useSearchParams();

    const {data, isLoading, isError} = useQueryWithErrorQueue({
        queryFn: getProjectBoard,
        queryKey: ["_board", projectId, searchParams.get("search"), searchParams.get("type"), searchParams.get("status")]
    });

    return (
        <div className="flex flex-col h-full bg-background">
            <NavBar>
                <ProjectHeader/>
                <div className="flex-1 overflow-auto p-4">
                    <div className="bg-container rounded-lg border border-default-border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {tableHeader.map((item) => (
                                        <TableHead
                                            key={item.key}
                                            className={item.className}
                                        >
                                            {t(item.title)}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading &&
                                    generateArrayOfUUIDs(20).map((item) => (
                                        <PlaceholderListViewTask key={item}/>
                                    ))
                                }
                                {!isLoading && data?.tasks && data.tasks.map((task) => (
                                    <ListViewTask key={task.uuid} task={task} setSelectedTask={setSelectedTask}/>
                                ))}
                            </TableBody>
                        </Table>
                        {data && data.tasks.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                No tasks found
                            </div>
                        )}
                    </div>
                </div>
            </NavBar>

            {isError && !data &&
                <SomethingWentWrongText/>
            }

            <TaskDetail
                task={selectedTask}
                setClosed={() => setSelectedTask(null)}
            />
        </div>
    );
}
