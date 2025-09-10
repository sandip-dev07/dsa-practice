import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type {
  DSAQuestion,
  SortKey,
  SortDirection,
} from "@/types/question-types";
import { createQuestionId } from "@/utils/dsa";
import { Notebook, Plus, ExternalLink } from "lucide-react";
import { useState, memo, useCallback } from "react";
import { NotesDialog } from "./NotesDialog";
import Image from "next/image";

// Helper function to extract domain from URL
const getDomain = (url: string) => {
  try {
    // Handle URLs without protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(fullUrl).hostname;
    return domain;
  } catch {
    return "";
  }
};

// Memoized platform icon component
const PlatformIcon = memo(({ url }: { url: string }) => {
  const domain = getDomain(url);
  if (!domain) return null;

  // Ensure full URL for the link
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;

    return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity inline-flex items-center justify-center"
      title={`View on ${domain}`}
    >
      <Image
        src={`https://favicon.yandex.net/favicon/${domain}`}
        alt={`${domain} icon`}
        width={18}
        height={18}
        className="w-5 h-5 rounded-sm"
        onError={(e) => {
          // Replace with fallback icon on error
          e.currentTarget.style.display = 'none';
          const fallbackIcon = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallbackIcon) {
            fallbackIcon.style.display = 'inline-flex';
          }
        }}
      />
      <div className="w-5 h-5 rounded-sm bg-muted items-center justify-center hidden">
        <ExternalLink className="w-3 h-3 text-muted-foreground" />
      </div>
    </a>
  );
});

PlatformIcon.displayName = "PlatformIcon";

// Memoized question row component
const QuestionRow = memo(({
  question,
  questionId,
  serial,
  isCompleted,
  hasNotes,
  onToggleCompleted,
  onNotesClick
}: {
  question: DSAQuestion;
  questionId: string;
  serial: number;
  isCompleted: boolean;
  hasNotes: boolean;
  onToggleCompleted: (questionId: string) => void;
  onNotesClick: (question: DSAQuestion) => void;
}) => {
  const handleToggle = useCallback(() => {
    onToggleCompleted(questionId);
  }, [onToggleCompleted, questionId]);

  const handleNotes = useCallback(() => {
    onNotesClick(question);
  }, [onNotesClick, question]);

  return (
    <TableRow
      className={`transition-all duration-200 ${
        isCompleted
          ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/10 border-l-4 border-b-0 border-emerald-500 dark:border-emerald-400 hover:shadow-sm"
          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      } h-14`}
    >
      <TableCell>
        <Checkbox
          checked={isCompleted}
          onCheckedChange={handleToggle}
          className={
            isCompleted
              ? "text-emerald-600 border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              : "border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
          }
        />
      </TableCell>
      <TableCell className="w-[60px] text-muted-foreground select-none">
        {serial}
      </TableCell>
      <TableCell className="font-medium whitespace-nowrap">
        {question.topic}
      </TableCell>
      <TableCell className="max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
        {question.question}
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            question.difficulty === "Easy"
              ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600 font-semibold px-3 py-1"
              : question.difficulty === "Medium"
              ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600 font-semibold px-3 py-1"
              : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600 font-semibold px-3 py-1"
          }
        >
          {question.difficulty}
        </Badge>
      </TableCell>
      <TableCell>
        {question.link && question.link.trim() && question.link !== "Link not provided" ? (
          <PlatformIcon url={question.link} />
        ) : (
          <span className="text-muted-foreground text-sm">N/A</span>
        )}
      </TableCell>
      <TableCell>
        <button
          onClick={handleNotes}
          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
            hasNotes
              ? "bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400"
              : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
          }`}
          title={hasNotes ? "View Notes" : "Add Notes"}
        >
          {hasNotes ? (
            <Notebook className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </button>
      </TableCell>
    </TableRow>
  );
});

QuestionRow.displayName = "QuestionRow";

interface QuestionsTableProps {
  questions: DSAQuestion[];
  completedQuestions: Record<string, boolean>;
  onToggleCompleted: (questionId: string) => void;
  onSort: (key: SortKey) => void;
  currentSortKey: SortKey;
  currentSortDir: SortDirection;
  notesData?: Record<string, string>;
  baseIndex?: number;
}

export const QuestionsTable = memo(({
  questions,
  completedQuestions,
  onToggleCompleted,
  onSort,
  currentSortKey,
  currentSortDir,
  notesData = {},
  baseIndex = 0,
}: QuestionsTableProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<DSAQuestion | null>(
    null
  );
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);

  const handleNotesClick = useCallback((question: DSAQuestion) => {
    setSelectedQuestion(question);
    setIsNotesDialogOpen(true);
  }, []);

  const handleSortClick = useCallback((key: SortKey) => {
    onSort(key);
  }, [onSort]);

  return (
    <>
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl w-full min-h-[450px] overflow-x-auto bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
              <TableHead className="w-[50px]">
                <span className="sr-only">Status</span>
              </TableHead>
              <TableHead className="w-[60px]">S.No</TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSortClick("topic")}
              >
                Topic
                {currentSortKey === "topic" && (
                  <span className="ml-2 text-muted-foreground">
                    {currentSortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSortClick("question")}
              >
                Question
                {currentSortKey === "question" && (
                  <span className="ml-2 text-muted-foreground">
                    {currentSortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSortClick("difficulty")}
              >
                Difficulty
                {currentSortKey === "difficulty" && (
                  <span className="ml-2 text-muted-foreground">
                    {currentSortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead>
                <span className="">Link</span>
              </TableHead>
              <TableHead className="w-[100px]">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.length > 0 ? (
              questions.map((question, index) => {
                const questionId = createQuestionId(question);
                const isCompleted = completedQuestions[questionId];
                const hasNotes = notesData?.[questionId];

                return (
                  <QuestionRow
                    key={questionId}
                    question={question}
                    questionId={questionId}
                    serial={baseIndex + index + 1}
                    isCompleted={isCompleted}
                    hasNotes={!!hasNotes}
                    onToggleCompleted={onToggleCompleted}
                    onNotesClick={handleNotesClick}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No questions found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedQuestion && (
        <NotesDialog
          isOpen={isNotesDialogOpen}
          onClose={() => {
            setIsNotesDialogOpen(false);
            setSelectedQuestion(null);
          }}
          question={selectedQuestion.question}
          questionId={createQuestionId(selectedQuestion)}
          topic={selectedQuestion.topic}
        />
      )}
    </>
  );
});

QuestionsTable.displayName = "QuestionsTable";
