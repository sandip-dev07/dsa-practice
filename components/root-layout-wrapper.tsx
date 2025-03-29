"use client";

import { NavBar } from "@/components/nav-bar";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="container mx-auto py-4">{children}</main>
    </>
  );
} 