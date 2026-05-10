import {useEffect, useRef, useState} from "react";
import {PopupMessageTypes} from "@/types/popup";

type ErrorPopupProps = {
    name: string;
    message: string;
    type: PopupMessageTypes;
    setClosed: () => void;
}

export const Popup = (props: ErrorPopupProps) => {
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null);
    const colors = () => {
        switch (props.type) {
            case "success":
                return 'text-green-500';
            case "error":
                return 'text-red-500';
            case "warning":
                return 'text-yellow-600';
            default:
                return '';
        }
    }

    const close = () => {
        setOpen(false);

        closeTimeout.current = setTimeout(() => {
            props.setClosed();
            console.log("test")
        }, 400);
    };

    useEffect(() => {
        const openTimeout = setTimeout(() => {
            setOpen(true);
        }, 100);
        const triggerCloseTimeout = setTimeout(() => {
            close();
        }, 5000);
        return () => {
            clearTimeout(openTimeout);
            clearTimeout(triggerCloseTimeout);
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
        }
    }, []);

    return (
        <div className={`flex flex-col ${colors()} bg-container shadow-xl p-3 rounded-md transition-transform duration-300 transform ${
            open ? 'translate-x-0' : `translate-x-full`}`}>
            <span className="text-lg">{props.name}</span>
            <span className="text-sm font-light">{props.message}</span>
        </div>
    )
}