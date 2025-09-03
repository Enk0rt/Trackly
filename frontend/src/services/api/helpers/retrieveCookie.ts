import {cookies} from "next/headers";

export const retrieveCookie =  async ():Promise<{ accessToken: string|null;refreshToken: string|null }> => {
    const cookieStore = await cookies();
    return {
        accessToken: cookieStore.get("accessToken")?.value || null,
        refreshToken: cookieStore.get("refreshToken")?.value || null,
    };
}