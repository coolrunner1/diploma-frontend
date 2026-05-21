import { QueryKey } from "@tanstack/query-core";
import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosErrorToMessage } from "@/utils/mappers";
import { AxiosError } from "axios";
import { useStore } from "@/utils/store";

export function useMutationWithErrorQueue<
    TData = unknown,
    TVariables = void,
    TError = AxiosError,
    TContext = unknown,
>(
    options: UseMutationOptions<
        TData,
        TError,
        TVariables,
        TContext
    >
) {
    const pushError = useStore(
        (state) => state.pushMessage
    );

    const mutation = useMutation(options);

    useEffect(() => {
        if (
            mutation.error &&
            mutation.error instanceof AxiosError
        ) {
            pushError(
                AxiosErrorToMessage(mutation.error)
            );
        }
    }, [mutation.error, pushError]);

    return mutation;
}