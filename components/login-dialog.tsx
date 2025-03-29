"use client";

import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoginDialog } from "@/hooks/use-login-dialog";
import { Github } from "lucide-react";
import { ReactNode } from "react";

interface LoginDialogProps {
  children?: ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const { isOpen, onClose } = useLoginDialog();

  const handleLogin = () => {
    signIn("github");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-background border-2 border-white/20">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            Please sign in with GitHub to track your progress
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <Button
            onClick={handleLogin}
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
        </div>
      </DialogContent>
      {children}
    </Dialog>
  );
} 