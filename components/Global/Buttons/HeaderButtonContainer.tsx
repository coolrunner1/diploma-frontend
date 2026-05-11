import {ReactNode} from "react";

export type HeaderButtonProps = {
    type?: "regular" | "big";
}

export type HeaderButtonContainerProps = {
    onClick?: () => void;
    children?: ReactNode;
} & HeaderButtonProps;

export const HeaderButtonContainer = (props: HeaderButtonContainerProps) => {
    if (props.type === "big") {
        return (
            <button
                className={"p-3 rounded-xl bg-container hover:bg-hover dark:text-white shadow-md transition-all duration-200"}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        );
    }

    return (
        <button
            className={"p-1.5 rounded-md bg-container hover:bg-hover dark:text-white transition-all duration-200"}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}