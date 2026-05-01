export type Status = {
  uuid: string,
  name: string,
};

export type Task = {
    uuid: string;
    name: string;
    description: string;
    status: string;
    type: "task" | "bug" | "story" | "epic";
    priority: "low" | "medium" | "high" | "critical";
    tags?: string[];
    messageCount: number;
    startTimestamp: string;
    endTimestamp: string;
}

/*export type Tasks = {
    status: string;
    tasks: Task[];
}*/