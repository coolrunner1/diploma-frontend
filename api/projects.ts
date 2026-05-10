import axios, {AxiosError, AxiosResponse} from "axios";
import axiosClient from "@/api/axiosClient";

export const triggerApiError = (): AxiosResponse<unknown, AxiosError> => {
    return axios.get()
}