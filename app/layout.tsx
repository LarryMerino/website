import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { ThemeInit } from "@/.flowbite-react/init";
import "./globals.css";

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
        <ThemeModeScript />
      </head>
        <body>
          <ThemeInit />
          {children}
        </body>
    </html>
  );
}