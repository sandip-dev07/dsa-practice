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
import { useNotes, useSaveNotes } from "@/hooks/use-api";

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

  // SWR hooks for notes data
  const { notes, isLoading: isFetching, error: fetchError } = useNotes(question, topic);
  const { saveNotes, isSaving: isLoading, error: saveError } = useSaveNotes();

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

  // Reset content when dialog opens with new question/topic or when notes are loaded
  useEffect(() => {
    if (isOpen) {
      if (initialContent) {
        setContent(initialContent);
      } else if (notes?.content) {
        setContent(notes.content);
      } else if (!isFetching) {
        // No initial content and no notes found
        setContent("");
      }
    }
  }, [isOpen, question, topic, initialContent, notes, isFetching]);

  // Show error if fetching failed
  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to load notes");
    }
  }, [fetchError]);

  const handleSave = useCallback(async () => {
    if (!content.trim()) {
      toast.error("Please add some content before saving");
      return;
    }

    try {
      const result = await saveNotes({
        question,
        topic,
        content: content.trim(),
      });

      if (result) {
        toast.success("Notes saved successfully");
        onClose();
      } else {
        toast.error("Failed to save notes");
      }
    } catch (error) {
      console.error("Error saving notes:", error);
      const message = error instanceof Error ? error.message : "Failed to save notes";
      toast.error(message);
    }
  }, [content, question, topic, saveNotes, onClose]);

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
      <DialogContent className="max-w-5xl h-[88vh] flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-0">
        <DialogHeader className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700">
          <DialogTitle className="text-md font-semibold text-zinc-800 dark:text-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                <NotebookPen className="h-4 w-4 text-white" />
              </div>
              <span className="truncate max-w-md">{question}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="h-full p-2">
            <Editor
              content={content}
              onChange={handleContentChange}
              placeholder="Start writing your notes here..."
            />
          </div>
        </div>

        <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <kbd className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded font-mono text-xs">
                Ctrl + S
              </kbd>
              <span>to save</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={isSaveDisabled}
                className={` py-2 font-medium transition-all duration-200 ${
                  hasUnsavedChanges
                    ? " shadow-lg hover:shadow-xl"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-1" />
                    Save
                  </>
                ) : isFetching ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-1" />
                    Save
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    {hasUnsavedChanges ? "Save" : "Save"}
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
