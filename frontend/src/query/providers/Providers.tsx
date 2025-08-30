"use client"

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props ={
    children:React.ReactNode
}

export const Providers = ({children}:Props) => {
    const [client] = useState(()=> new QueryClient());
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

