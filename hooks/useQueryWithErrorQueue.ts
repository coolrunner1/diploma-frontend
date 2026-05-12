import { QueryKey } from "@tanstack/query-core";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosErrorToMessage } from "@/utils/mappers";
import { AxiosError } from "axios";
import { useStore } from "@/utils/store";

export function useQueryWithErrorQueue<
    TData = unknown,
    TError = AxiosError
>(
    options: UseQueryOptions<TData, TError, TData, QueryKey>
) {
    const pushError = useStore(state => state.pushMessage);
    const { data, isLoading, isError, error } = useQuery(options);

    useEffect(() => {
        if (error && error instanceof AxiosError) {
            pushError(AxiosErrorToMessage(error));
        }
    }, [error, pushError]);

    return { data, isLoading, isError };
}