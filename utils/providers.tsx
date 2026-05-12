"use client";

import {queryClient} from "@/api/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode, useEffect} from "react";
import {PopupsContainer} from "@/components/Global/Misc/PopupsContainer";

export default function Providers({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <PopupsContainer/>
            {children}
        </QueryClientProvider>
    );
}