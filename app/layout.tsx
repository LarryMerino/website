import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Larry Merino Website",
  description: "Mi personal website"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}