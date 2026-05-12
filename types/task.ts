import {User} from "@/types/user";
import {ProjectStatus} from "@/types/project";

export type Task = {
    id: number;
    uuid: string;
    title: string;
    description?: string;
    commentSummary?: string;

    userId: number;
    statusId: number;
    messageCount: number;
    projectId: number;
    position: number;

    type: "task" | "bug" | "story" | "epic";
    priority: "low" | "medium" | "high" | "critical";

    tags: Tag[] | null;

    blockedBy: number;

    startTimestamp: string;
    endTimestamp: string;

    assignee: User;
    status: ProjectStatus;
};

export type Tag = {
    uuid: string;
    title: string;
};

export type TaskNodeData = Task & {
    isBlocker: boolean;
    emphasized: boolean;
}