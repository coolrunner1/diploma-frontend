import axiosClient from "@/api/axiosClient";
import {QueryKeyObject} from "@/api/queryClient";
import {Project, ProjectBoard} from "@/types/project";

export const getProjectBoard = async({queryKey}: QueryKeyObject): Promise<ProjectBoard> => {
    const [_key, id, search, type, status] = queryKey;

    const params = new URLSearchParams();

    if (search) params.append('search', String(search));
    if (type) params.append('type', String(type));
    if (status) params.append('status', String(status));

    const res = await axiosClient.get(`/projects/${id}/board?${params.toString()}`);

    return res.data;
}

export const getProjects = async(): Promise<Project[]> => {
    const res = await axiosClient.get(`/projects`);

    return res.data;
}