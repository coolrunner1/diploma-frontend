import {Task} from "@/types/task";
import { v4 as uuidv4 } from 'uuid';
import {MutationKey} from "@tanstack/query-core";
import axiosClient from "@/api/axiosClient";
import {QueryKeyObject} from "@/api/queryClient";
import {ProjectBoard} from "@/types/project";

export const getTasks = async({queryKey}: QueryKeyObject): Promise<Task[]> => {
    const [_key, id] = queryKey;
    const res = await axiosClient.get(`/projects/${id}/tasks`);

    return res.data;
}

export const updateTaskStatus = async ({mutationKey}: {mutationKey: MutationKey}): Promise<void> => {
    const [_key, projectId, taskId, newStatus] = mutationKey;

    return await axiosClient.put(`/projects/${projectId}/tasks/${taskId}`, {statusId: newStatus});
}



/*
export const getTasks = async (): Promise<Tasks[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    status: "to-do",
                    tasks: [
                        {
                            uuid: "3sdfsd322",
                            name: "Name",
                            description: "Name"
                        },
                        {
                            uuid: "324323222",
                            name: "Name2",
                            description: "Name"
                        }
                    ]
                },
                {
                    status: "in-progress",
                    tasks: [
                        {
                            uuid: "32432322",
                            name: "Name3",
                            description: "Name"
                        },
                        {
                            uuid: "32432432",
                            name: "Name4",
                            description: "Name"
                        }
                    ]
                }
            ]);
        }, 1500);
    });
}
*/