import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/query/providers/Providers";
import React from "react";
import Menu from "@/components/menu/Menu";

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



  return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${poppins.className} text-[#0C312C] antialiased bg-white dark:bg-[#33674E]/54 transition-all duration-300 ease-in-out`}
            >
           <Providers>
               <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
                   {children}
               </ThemeProvider>
           </Providers>
            </body>
        </html>
  );
}
