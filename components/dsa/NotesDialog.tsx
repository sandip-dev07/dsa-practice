import { useState, useEffect, useCallback, memo, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Save, NotebookPen } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Dynamically import the editor to avoid SSR issues
const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>
});

interface NotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  topic: string;
  initialContent?: string;
}

const NotesDialogComponent: React.FC<NotesDialogProps> = ({
  isOpen,
  onClose,
  question,
  topic,
  initialContent = "",
}) => {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Memoized derived values
  const hasUnsavedChanges = useMemo(() =>
    content !== initialContent && content.trim().length > 0,
    [content, initialContent]
  );

  const isSaveDisabled = useMemo(() =>
    isLoading || isFetching || !content.trim(),
    [isLoading, isFetching, content]
  );

  // Memoized question-topic key for dependency tracking
  const questionTopicKey = useMemo(() =>
    `${question}-${topic}`,
    [question, topic]
  );

  // Reset content when dialog opens with new question/topic
  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
      setIsLoading(false);
      setIsFetching(false);
      if (!initialContent) {
        fetchNotes();
      }
    }
  }, [isOpen, questionTopicKey, initialContent]);

  const fetchNotes = useCallback(async () => {
    if (isFetching) return;

    setIsFetching(true);
    try {
      const response = await fetch(
        `/api/notes?question=${encodeURIComponent(question)}&topic=${encodeURIComponent(topic)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          // No notes found, this is not an error - just no existing notes
          return;
        }
        if (response.status === 401) {
          throw new Error("Please log in to view your notes");
        }
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const data = await response.json();
      if (data?.content) {
        setContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      const message = error instanceof Error ? error.message : "Failed to load notes";
      toast.error(message);
    } finally {
      setIsFetching(false);
    }
  }, [questionTopicKey, isFetching]);

  const handleSave = useCallback(async () => {
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
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error("Please log in to save your notes");
        }
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again");
        }
        throw new Error(errorData.error || `Failed to save notes: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success("Notes saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving notes:", error);
      const message = error instanceof Error ? error.message : "Failed to save notes";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [content, questionTopicKey, onClose]);

  // Handle content change with debouncing consideration
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Ctrl+S or Cmd+S to save
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (!isSaveDisabled) {
          handleSave();
        }
      }

      // Escape to close (handled by dialog already)
      if (event.key === 'Escape') {
        if (hasUnsavedChanges) {
          const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close?");
          if (!confirmClose) {
            event.stopPropagation();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSaveDisabled, handleSave, hasUnsavedChanges]);

  // Memoized dialog title
  const dialogTitle = useMemo(() =>
    `Notes for: ${question}`,
    [question]
  );

  // Memoized save button text
  const saveButtonText = useMemo(() => {
    if (isFetching) return "Loading...";
    if (isLoading) return "Saving...";
    return hasUnsavedChanges ? "Save Notes" : "Notes Saved";
  }, [isFetching, isLoading, hasUnsavedChanges]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-0">
        <DialogHeader className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <DialogTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <NotebookPen className="h-4 w-4 text-white" />
              </div>
              <span className="truncate max-w-md">{question}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="h-full p-4">
            <Editor
              content={content}
              onChange={handleContentChange}
              placeholder="Start writing your notes here..."
            />
          </div>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded font-mono text-xs">
                ⌘S
              </kbd>
              <span>to save</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={isSaveDisabled}
                className={`px-6 py-2 font-medium transition-all duration-200 ${
                  hasUnsavedChanges
                    ? " shadow-lg hover:shadow-xl"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : isFetching ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {hasUnsavedChanges ? "Save Notes" : "Notes Saved"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

NotesDialogComponent.displayName = "NotesDialogComponent";

export const NotesDialog = memo(NotesDialogComponent);
