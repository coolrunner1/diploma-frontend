import {Task} from "@/types/task";
import { v4 as uuidv4 } from 'uuid';
import {MutationKey} from "@tanstack/query-core";

export const getTasks = async (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
        let tasks = localStorage.getItem("tasks");
        console.log(tasks);
        if (!tasks) {
            tasks = JSON.stringify([
                {
                    uuid: uuidv4(),
                    name: "Namebfdyvdjv sdv",
                    description: "Name",
                    type: "task",
                    status: "To Do",
                    tags: ["test", "test"],
                    priority: "low",
                    endTimestamp: Date.now(),
                    messageCount: 2,
                },
                {
                    uuid: uuidv4(),
                    name: "Name2",
                    description: "Name",
                    type: "bug",
                    status: "To Do",
                    priority: "medium"
                },
                {
                    uuid: uuidv4(),
                    name: "Name2",
                    description: "Name",
                    status: "To Do",
                    tags: ["test", "test", "test2", "test3"],
                },
                {
                    uuid: uuidv4(),
                    name: "Name2",
                    description: "Name",
                    status: "To Do"
                },
                {
                    uuid: uuidv4(),
                    name: "Name2",
                    description: "Name",
                    status: "To Do"
                },{
                    uuid: uuidv4(),
                    name: "Name2",
                    description: "Name",
                    status: "To Do",
                    priority: "critical"
                },


                {
                    uuid: uuidv4(),
                    name: "Name3",
                    description: "Name",
                    status: "In Progress"
                },
                {
                    uuid: uuidv4(),
                    name: "Name4",
                    description: "Name",
                    status: "In Progress"
                }
            ]);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        setTimeout(() => {
            const retrievedTasks: unknown = JSON.parse(tasks);
            if (typeof retrievedTasks === "string") {
                resolve(JSON.parse(retrievedTasks));
                return;
            }
            resolve(retrievedTasks as Task[]);
        }, 1500);
    });
}

export const updateTaskStatus = async ({mutationKey}: {mutationKey: MutationKey}): Promise<void> => {
    return new Promise((resolve, reject) => {
        const [_key, taskId, newStatus] = mutationKey;
        const tasks = localStorage.getItem("tasks");
        if (!tasks) {
            reject("Tasks not found");
            return;
        }
        const parsedTasks: Task[] = JSON.parse(tasks);
        parsedTasks.forEach((task: Task) => {
            if (task.uuid === taskId) {
                if (typeof newStatus !== "string") {
                    reject("Invalid status");
                    return;
                }
                task.status = newStatus;
                console.log(task);
            }
        });
        console.log(parsedTasks);
        localStorage.setItem("tasks", JSON.stringify(parsedTasks));
        setTimeout(() => {
            resolve();
        }, 900)
    });
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