import {User} from "@/types/user";
import {Task} from "@/types/task";

export type Project = {
    id: number;
    uuid: string;
    title: string;
    description: string;
    editableStatuses: boolean;
    companyId: number;
    startDate: string;
    endDate: string;
}

export type ProjectBoard = Project & {
    projectStatus: ProjectStatus[];
    tasks: Task[];
};

export type ProjectStatus = {
    id: number;
    uuid: string;
    title: string;
    description: string;
    position: number;
    bgColor: string;
    final: boolean;
};



