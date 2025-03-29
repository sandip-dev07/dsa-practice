"use client";

import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginDialog } from "@/components/login-dialog";
import { useProgress } from "@/hooks/use-progress";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProgressCheckboxProps {
  question: string;
  topic: string;
  className?: string;
}

export function ProgressCheckbox({ question, topic, className }: ProgressCheckboxProps) {
  const { data: session, status } = useSession();
  const { isQuestionSolved, updateProgress, loading } = useProgress();
  const [checked, setChecked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !loading) {
      setChecked(isQuestionSolved(question));
    }
  }, [isQuestionSolved, question, status, loading]);

  const handleCheckedChange = async (checked: boolean) => {
    if (status === "unauthenticated") {
      toast.error("Please sign in to track your progress", {
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth/signin"
        }
      });
      return;
    }

    if (isUpdating || loading) return;
    
    setIsUpdating(true);
    try {
      const success = await updateProgress(question, topic, checked);
      if (success) {
        setChecked(checked);
        toast.success(checked ? "Question marked as solved" : "Question marked as unsolved");
      } else {
        toast.error("Failed to update progress");
      }
    } catch (error) {
      toast.error("Failed to update progress");
    } finally {
      setIsUpdating(false);
    }
  };

  const checkbox = (
    <Checkbox
      checked={checked}
      onCheckedChange={handleCheckedChange}
      className={className}
      disabled={isUpdating || loading}
    />
  );

  if (status === "unauthenticated") {
    return <LoginDialog>{checkbox}</LoginDialog>;
  }

  return checkbox;
} 