import {ReactNode, useEffect, useState} from "react";

export type BurgerContainerProps = {
    children: ReactNode;
    setClosed: () => void;
    position: "right" | "left"
}

export const BurgerContainer = (props: BurgerContainerProps) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }, [])

    const close = () => {
        setOpen(false);

        setTimeout(() => {
            props.setClosed();
        }, 400);
    };

    return (
        <div
            onClick={close}
            className={`select-none z-20 fixed top-0 min-h-screen min-w-screen bg-[#000000a0]`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-container h-screen scrollbar-hide w-full md:w-xl transition-transform duration-300 transform ${
                    open ? 'translate-x-0' : `${
                        props.position === 'left' ? "-" : ""
                    }translate-x-full`} ${
                    props.position === 'left' ? "mr-auto md:rounded-r-2xl" : "ml-auto md:rounded-l-2xl"
                }`}
            >
                {props.children}
            </div>
        </div>
    )
}