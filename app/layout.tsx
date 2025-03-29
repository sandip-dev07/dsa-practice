import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { RootLayoutWrapper } from "@/components/root-layout-wrapper";
import { LoginDialog } from "@/components/login-dialog";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DSA Questions Table",
  description:
    "A comprehensive list of Data Structures and Algorithms questions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
          <LoginDialog />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
