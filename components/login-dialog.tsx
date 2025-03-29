"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useLoginDialog } from "@/hooks/use-login-dialog";

interface LoginDialogProps {
  children?: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const { isOpen, onClose } = useLoginDialog();

  return (
    <>
      {children}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              Please sign in to track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => signIn("github")}
            >
              <Github className="h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 