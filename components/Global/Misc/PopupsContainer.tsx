import {useStore} from "@/utils/store";
import {Popup} from "./Popup";
import {useEffect} from "react";

export const ErrorPopupContainer = () => {
    const messages = useStore(state => state.messageQueue);
    const popMessage = useStore(state => state.popMessage);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex pointer-events-none">
            <div className="flex flex-col gap-3 p-2 ml-auto mt-auto max-w-xl">
                {messages.length > 0 && messages.map((error) => (
                    <Popup
                        key={error.uuid}
                        name={error.name}
                        message={error.message}
                        type={error.type}
                        setClosed={popMessage}
                    />
                ))}
            </div>
        </div>
    )
}