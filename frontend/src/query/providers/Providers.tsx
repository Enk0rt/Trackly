"use client";

import { useState } from "react";
import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupInterceptors } from "@/services/api/axiosInstanse";

type Props = {
    children: React.ReactNode,
    dehydratedState?: DehydratedState | null | undefined
}

export const Providers = ({ children, dehydratedState }: Props) => {
    const [client] = useState(() => new QueryClient());

    setupInterceptors(client);
    return (
        <QueryClientProvider client={client}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
};

