"use client";
import React from "react";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./theme-toggle";
import { Code } from "lucide-react";

export function NavBar() {

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex-1 flex items-center gap-2">
          <Code size={24} strokeWidth={2.4} className="text-red-500" />
          <h1 className="text-xl font-semibold font-mono">Codxt</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
