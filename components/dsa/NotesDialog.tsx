import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Loader2, Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Dynamically import the editor to avoid SSR issues
const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

interface NotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  topic: string;
  initialContent?: string;
}

export function NotesDialog({
  isOpen,
  onClose,
  question,
  topic,
  initialContent = "",
}: NotesDialogProps) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !initialContent) {
      fetchNotes();
    }
  }, [isOpen, question, topic]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `/api/notes?question=${encodeURIComponent(
          question
        )}&topic=${encodeURIComponent(topic)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        setContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes");
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Please add some content before saving");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          topic,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save notes: ${response.statusText}`);
      }

      const data = await response.json();

      toast.success("Notes saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-3 pb-0">
          <DialogTitle className="text-xl font-semibold">Add Note</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden p-0 px-3">
          <div className="h-full">
            <Editor
              content={content}
              onChange={setContent}
              placeholder="Write your notes here..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 p-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            Save Notes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
