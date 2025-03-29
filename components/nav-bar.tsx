"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserNav } from "./UserNav";

export function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Practice DSA Questions</h1>
        </div>
        <UserNav />
      </div>
    </nav>
  );
}
