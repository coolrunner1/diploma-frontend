"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {cn, stringToHexColor} from "@/utils/utils";

function Avatar({
                    className,
                    ...props
                }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            className={cn(
                "relative flex size-10 shrink-0 overflow-hidden rounded-full",
                className,
            )}
            {...props}
        />
    );
}

function AvatarImage({
                         className,
                         ...props
                     }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            data-slot="avatar-image"
            className={cn("aspect-square size-full", className)}
            {...props}
        />
    );
}

function AvatarFallback({
                            title,
                            className,
                            ...props
                        }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            style={{backgroundColor: stringToHexColor(String(title))}}
            className={cn(
                "flex size-full items-center justify-center rounded-full",
                className,
            )}
            {...props}
        >{title}</AvatarPrimitive.Fallback>
    );
}

export {Avatar, AvatarImage, AvatarFallback};
