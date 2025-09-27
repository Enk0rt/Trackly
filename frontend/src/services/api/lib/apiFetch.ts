import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(input: string, init?: RequestInit) {
    const url = input.startsWith("http") ? input : `${baseUrl}${input}`;

    if (typeof window === "undefined") {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        return fetch(url, {
            ...init,
            headers: {
                ...(init?.headers || {}),
                Cookie: cookieHeader,
            },
            cache: "no-store",
        });
    }

    return fetch(url, {
        ...init,
        credentials: "include",
    });
}