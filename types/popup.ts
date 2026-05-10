export type PopupMessageTypes = "success" | "message" | "warning"| "error";

export type NewPopupMessage = {
    name: string,
    message: string;
    type: PopupMessageTypes;
}

export type PopupMessage = NewPopupMessage & {
    uuid: string,
}