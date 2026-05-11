import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import axiosClient from "@/api/axiosClient";
import {QueryKeyObject} from "@/api/queryClient";
import {ProjectBoard} from "@/types/project";

export const triggerApiError = (): AxiosResponse<unknown, AxiosError> => {
    return axios.get()
}

export const getProjectBoard = ({queryKey}: QueryKeyObject): AxiosResponse<ProjectBoard, AxiosError> => {
    const [_key, id] = queryKey;
    return axiosClient.get(`/projects/${id}/board`)
}