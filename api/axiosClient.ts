import axios, {AxiosError, AxiosResponse} from "axios";
//import {getToken, signOut} from "@/utils/tempAuth";

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api/v1`,
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
    function (error: AxiosError) {
        const res = error.response;
        if (!res) return Promise.reject(error);

        switch (res.status) {
            case 401:
                alert('Session expired');
                break;
            case 500:
                return Promise.reject("Errors.server-error");
                break;
            case 501:
                alert('Not implemented');
                break;

        }
        /*if (res.status === 400) {
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
        }*/
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