"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SWRConfig } from "swr";
import { swrConfig } from "@/lib/swr-config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SWRConfig value={swrConfig}> {children} </SWRConfig>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
