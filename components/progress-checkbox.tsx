"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { LoginDialog } from "@/components/login-dialog";
import { useLoginDialog } from "@/hooks/use-login-dialog";
import { useUpdateProgress } from "@/hooks/use-api";

interface ProgressCheckboxProps {
  question: string;
  topic: string;
  initialSolved?: boolean;
}

export function ProgressCheckbox({ question, topic, initialSolved = false }: ProgressCheckboxProps) {
  const { data: session, status } = useSession();
  const [solved, setSolved] = useState(initialSolved);
  const { onOpen } = useLoginDialog();
  const { updateProgress } = useUpdateProgress();

  useEffect(() => {
    setSolved(initialSolved);
  }, [initialSolved]);

  const handleChange = async (checked: boolean) => {
    if (status === "unauthenticated") {
      onOpen();
      return;
    }

    // Optimistically update UI
    const previousState = solved;
    setSolved(checked);

    try {
      const result = await updateProgress({
        question,
        topic,
        solved: checked,
      });

      if (!result) {
        // Revert optimistic update on failure
        setSolved(previousState);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      // Revert the checkbox state on error
      setSolved(previousState);
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