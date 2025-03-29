"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An error occurred during authentication";
  if (error === "OAuthAccountNotLinked") {
    errorMessage = "This account is already linked to a different provider. Please sign in with the original provider.";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold">Authentication Error</h1>
        <p className="mb-8 text-gray-600">{errorMessage}</p>
        <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
          Try Again with GitHub
        </Button>
      </div>
    </div>
  );
} 