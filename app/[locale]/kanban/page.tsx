"use client"

import {useQuery} from "@tanstack/react-query";
import {getTasks} from "@/api/tasks";
import {KanbanStatus} from "@/components/KanbanStatus";

export default function KanbanPage() {

    const {data, isLoading, isError} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    })

    return (
        <>
            {isLoading && <div className={"h-screen w-screen animate-pulse bg-gray-400"}>placeholder</div>}
            {!isLoading && !isError && data &&
                <div className={"flex flex-row gap-5"}>
                    {data && data.map(item =>
                        <KanbanStatus
                            key={item.status}
                            status={item.status}
                            tasks={item.tasks}
                        />
                    )}
                </div>
            }

        </>
    );
}
