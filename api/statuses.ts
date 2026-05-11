import {ProjectStatus} from "@/types/project";
import {QueryKeyObject} from "@/api/queryClient";
import axiosClient from "@/api/axiosClient";

export const getStatuses = async ({queryKey}: QueryKeyObject): Promise<ProjectStatus[]> => {
    const [_key, id] = queryKey;
    return await axiosClient.get(`/projects/${id}/statuses`);
}