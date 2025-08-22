import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";



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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-[#0C312C] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
