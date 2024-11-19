import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
  title: "Foro UP",
  description: "TP integrador Arq. Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col min-h-screen pb-8`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
