import {useStore} from "@/utils/store";
import {Popup} from "./Popup";
import {useEffect} from "react";

export const ErrorPopupContainer = () => {
    const messages = useStore(state => state.messageQueue);
    const popMessage = useStore(state => state.popMessage);

    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <div className="fixed w-screen h-screen flex pointer-events-none">
            <div className="flex flex-col gap-3 p-2 ml-auto mt-auto max-w-xl">
                {messages.map((error) => (
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