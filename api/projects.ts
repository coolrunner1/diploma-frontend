import axiosClient from "@/api/axiosClient";
import {QueryKeyObject} from "@/api/queryClient";
import {Project, ProjectBoard} from "@/types/project";

export const getProjectBoard = async({queryKey}: QueryKeyObject): Promise<ProjectBoard> => {
    const [_key, id] = queryKey;
    const res = await axiosClient.get(`/projects/${id}/board`);

    return res.data;
}

export const getProjects = async(): Promise<Project[]> => {
    const res = await axiosClient.get(`/projects`);

    return res.data;
}