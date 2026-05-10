import {NewPopupMessage} from "@/types/popup";
import {AxiosError} from "axios";

export const AxiosErrorToMessage = (error: AxiosError): NewPopupMessage => (
    {
        name: error.name,
        message: error.message,
        type: "error",
    }
);