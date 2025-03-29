"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { LoginDialog } from "@/components/login-dialog";
import { useLoginDialog } from "@/hooks/use-login-dialog";

interface ProgressCheckboxProps {
  question: string;
  topic: string;
  initialSolved?: boolean;
}

export function ProgressCheckbox({ question, topic, initialSolved = false }: ProgressCheckboxProps) {
  const { data: session, status } = useSession();
  const [solved, setSolved] = useState(initialSolved);
  const { onOpen } = useLoginDialog();

  useEffect(() => {
    setSolved(initialSolved);
  }, [initialSolved]);

  const handleChange = async (checked: boolean) => {
    if (status === "unauthenticated") {
      onOpen();
      return;
    }

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          topic,
          solved: checked,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      setSolved(checked);
    } catch (error) {
      console.error("Error updating progress:", error);
      // Revert the checkbox state on error
      setSolved(!checked);
    }
  };

  const checkbox = (
    <Checkbox
      checked={solved}
      onCheckedChange={handleChange}
      className="h-4 w-4"
    />
  );

  if (status === "unauthenticated") {
    return <LoginDialog>{checkbox}</LoginDialog>;
  }

  return checkbox;
} 