"use client"

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupInterceptors } from "@/services/api/axiosInstanse";

type Props ={
    children:React.ReactNode
}

export const Providers = ({children}:Props) => {
    const [client] = useState(()=> new QueryClient());
    setupInterceptors(client);
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

