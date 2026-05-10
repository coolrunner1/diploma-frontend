import {CSSProperties, ReactNode} from "react";

export type BadgeProps = {
    children: ReactNode,
    className?: string,
    style?: CSSProperties,
};

export const Badge = (props: BadgeProps) => {
    return (
        <div
            style={props.style}
            className={`mb-2 min-w-12 p-1 rounded-lg text-center text-dark ${
                props.className ? props.className : " bg-gray-300 dark:bg-gray-500 text-xs"
            }`}
        >
            {props.children}
        </div>
    )
}