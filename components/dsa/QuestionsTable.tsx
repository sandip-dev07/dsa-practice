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
import { Notebook, Plus } from "lucide-react";
import { useState } from "react";
import { NotesDialog } from "./NotesDialog";

interface QuestionsTableProps {
  questions: DSAQuestion[];
  completedQuestions: Record<string, boolean>;
  onToggleCompleted: (questionId: string) => void;
  onSort: (key: SortKey) => void;
  currentSortKey: SortKey;
  currentSortDir: SortDirection;
  notesData?: Record<string, string>;
}

export function QuestionsTable({
  questions,
  completedQuestions,
  onToggleCompleted,
  onSort,
  currentSortKey,
  currentSortDir,
  notesData = {},
}: QuestionsTableProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<DSAQuestion | null>(
    null
  );
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);

  const handleNotesClick = (question: DSAQuestion) => {
    setSelectedQuestion(question);
    setIsNotesDialogOpen(true);
  };

  return (
    <>
      <div className="border rounded-md w-full min-h-[450px] overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50 border-b border-border">
              <TableHead className="w-[50px]">
                <span className="sr-only">Status</span>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => onSort("topic")}
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
                onClick={() => onSort("question")}
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
                onClick={() => onSort("difficulty")}
              >
                Difficulty
                {currentSortKey === "difficulty" && (
                  <span className="ml-2 text-muted-foreground">
                    {currentSortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead>
                <span className="hidden sm:inline">Code Link</span>
                <span className="sm:hidden">Link</span>
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
                  <TableRow
                    key={questionId}
                    className={`transition-colors ${
                      isCompleted
                        ? "dark:bg-green-950/20 bg-green-50 dark:hover:bg-green-950/30 hover:bg-green-100"
                        : "hover:bg-muted/50"
                    } h-12`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => onToggleCompleted(questionId)}
                        className={
                          isCompleted ? "text-green-500 border-green-500" : ""
                        }
                      />
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
                            ? "dark:bg-green-950/20 bg-green-50 dark:text-green-400 text-green-700 dark:border-green-500 border-green-700"
                            : question.difficulty === "Medium"
                            ? "dark:bg-yellow-950/20 bg-yellow-50 dark:text-yellow-400 text-yellow-700 dark:border-yellow-500 border-yellow-700"
                            : "dark:bg-red-950/20 bg-red-50 dark:text-red-400 text-red-700 dark:border-red-500 border-red-700"
                        }
                      >
                        {question.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {question.link !== "Link not provided" ? (
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                        >
                          <span className="hidden sm:inline">View Problem</span>
                          <span className="sm:hidden">View</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleNotesClick(question)}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                        title={hasNotes ? "View Notes" : "Add Notes"}
                      >
                        {hasNotes ? (
                          <Notebook className="h-4 w-4 text-primary" />
                        ) : (
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
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
          topic={selectedQuestion.topic}
        />
      )}
    </>
  );
}
