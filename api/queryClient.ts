import {MutationKey, QueryClient, QueryKey} from "@tanstack/query-core";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1
        }
    }
});

export type QueryKeyObject = {
    queryKey: QueryKey;
}

export type MutationKeyObject = {
    mutationKey: MutationKey;
}