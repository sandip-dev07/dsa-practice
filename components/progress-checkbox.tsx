"use client";

import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginDialog } from "@/components/login-dialog";
import { useProgress } from "@/hooks/use-progress";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLoginDialog } from "@/hooks/use-login-dialog";
import { cn } from "@/lib/utils";

interface ProgressCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function ProgressCheckbox({
  checked,
  onCheckedChange,
  disabled = false,
  className,
}: ProgressCheckboxProps) {
  const { status } = useSession();
  const { onOpen } = useLoginDialog();

  const handleChange = (checked: boolean) => {
    if (status === "unauthenticated") {
      onOpen();
      return;
    }
    onCheckedChange(checked);
  };

  const checkbox = (
    <Checkbox
      checked={checked}
      onCheckedChange={handleChange}
      disabled={disabled || status === "loading"}
      className={cn(
        checked && "text-green-500 border-green-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );

  if (status === "unauthenticated") {
    return <LoginDialog>{checkbox}</LoginDialog>;
  }

  return checkbox;
} 