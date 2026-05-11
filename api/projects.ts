import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import axiosClient from "@/api/axiosClient";
import {QueryKeyObject} from "@/api/queryClient";
import {ProjectBoard} from "@/types/project";

export const triggerApiError = (): AxiosResponse<unknown, AxiosError> => {
    return axios.get()
}

export const getProjectBoard = async({queryKey}: QueryKeyObject): Promise<ProjectBoard> => {
    const [_key, id] = queryKey;
    const res = await axiosClient.get(`/projects/${id}/board`);

    return res.data;
}