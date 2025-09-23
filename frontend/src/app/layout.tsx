import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/query/providers/Providers";
import React from "react";
import { Menu } from "@/components/menu/Menu";
import { QueryClient } from "@tanstack/react-query";
import { getMe } from "@/services/api/auth";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ["300","400","500","700"],
})

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
                className={`${poppins.className} text-[#0C312C] antialiased bg-white dark:bg-[#33674E]/54 transition-all duration-300 ease-in-out`}
            >
           <Providers>
               <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                   <header className="flex items-center justify-center ">
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
