import {ReactNode} from "react";

export type HeaderButtonProps = {
    onClick?: () => void;
    children?: ReactNode;
}

export const HeaderButton = (props: HeaderButtonProps) => {
    return (
        <button
            className={"p-3 rounded-xl bg-container dark:text-white shadow-md transition-all duration-200"}
            onClick={props.onClick}
    >
            {props.children}
    </button>
    );
}