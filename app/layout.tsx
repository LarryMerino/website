import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { ThemeInit } from "@/.flowbite-react/init";
import "./globals.css";

import MainMegaMenu from "@/components/nav/MainMegaMenu";

export const metadata: Metadata = {
  title: "Larry Merino Website",
  description: "Mi personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Ensures dark/light is set before hydration */}
        <ThemeModeScript />
      </head>
        <body className="bg-background text-foreground">
          <ThemeInit />

          {/* --- GLOBAL NAVBAR (mega menu) --- */}
          <MainMegaMenu />
          
          {/* Main content */}
          {children}
        </body>
    </html>
  );
}