import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/query/providers/Providers";
import React from "react";
import { Menu } from "@/components/menu/Menu";
import { QueryClient } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth";
import Image from "next/image";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    title: "TrackLy",
    description: "Productivity app",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: getMe,
    });



    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${poppins.className} relative text-[#0C312C] antialiased bg-white dark:bg-[#33674E]/90 transition-all duration-300 ease-in-out overflow-x-hidden`}
        >
        <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="fixed inset-0 z-[-2] opacity-20 dark:opacity-14">
                    <Image
                        src="/main-bg.jpg"
                        alt="Human and nature"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
                <div
                    className="absolute sm:w-[600px] sm:h-[200px] rounded-[70%] top-[-100px] dark:top-[100px] left-[36%] bg-[#9FE1C1]/80 dark:bg-[#9FE1C1]/37 blur-[140px] z-[-1] opacity-0 animate-pulsation1 transform-gpu">
                </div>
                <div
                    className="absolute sm:w-[550px] sm:h-[240px] rounded-[70%] bottom-[100px] left-[2%] bg-[#9FE1C1]/80 dark:bg-[#9FE1C1]/37 blur-[180px] dark:blur-[120px] z-[-1] opacity-0 animate-pulsation2 delay-[.4s] transform-gpu"></div>
                <div
                    className="absolute sm:w-[350px] sm:h-[250px] rounded-[85%] bottom-[60px] right-[-6%] bg-[#9FE1C1]/80 dark:bg-[#9FE1C1]/37 blur-[180px] dark:blur-[120px] z-[-1] opacity-0 animate-pulsation3 delay-[.7s] transform-gpu"></div>

                <header className="flex items-center justify-center  opacity-0 animate-opacity">
                    <div className="w-[84%] max-w-[1249px]">
                        <Menu />
                    </div>
                </header>
                <main>
                    {children}
                </main>
                <footer>

                </footer>
            </ThemeProvider>
        </Providers>
        </body>
        </html>
    );
}
