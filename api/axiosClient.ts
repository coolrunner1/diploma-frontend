import axios, {AxiosResponse} from "axios";
//import {getToken, signOut} from "@/utils/tempAuth";

const axiosClient = axios.create({
    baseURL: `http://localhost:4000/api/v1`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const res: AxiosResponse = error.response;
        if (res.status === 401) {
            alert('Session expired');
            //signOut();
        }
        if (!res) return Promise.reject(error);
        if (res.status === 400) {
            let errorMsg = "";
            if (res.data.details) {
                res.data.details.forEach((item: any) => {
                    errorMsg += item.message+"\n";
                })
            } else {
                errorMsg = res.data.message;
            }
            alert(errorMsg);
        }
        if (res.status === 409) {
            alert(res.data.message);
        }
        if (res.status === 501) {
            alert('Not implemented');
        }
        if (res.status === 500) {
            return Promise.reject("Errors.server-error");
        }
        console.error("Looks like there was a problem. Status Code: " + res.status);
        console.error(error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        /*const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }*/
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;