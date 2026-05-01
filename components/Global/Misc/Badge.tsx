import {ReactNode} from "react";

export type BadgeProps = {
    children: ReactNode,
    className?: string
};

export const Badge = (props: BadgeProps) => {
    return (
        <div className={`mb-2 min-w-12 p-1 rounded-lg text-center ${props.className ? props.className : " bg-gray-300 dark:bg-gray-400 text-xs"}`}>
            {props.children}
        </div>
    )
}