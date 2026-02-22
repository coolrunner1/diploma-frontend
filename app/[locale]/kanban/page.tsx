"use client"

import {useQuery} from "@tanstack/react-query";
import {getTasks} from "@/api/tasks";

export default function KanbanPage() {

    const {data} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    })

    return (
        <>
            {data && data.map(item => item.status)}
        </>
    );
}
