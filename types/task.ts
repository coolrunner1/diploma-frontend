export type Task = {
    uuid: string;
    name: string;
    description: string;
}

export type Tasks = {
    status: string;
    tasks: Task[];
}