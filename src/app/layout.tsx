import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "../lib/fonts";

export const metadata: Metadata = {
  title: "Ticket App",
  description: "A full-stack ticketing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
