import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProgressCheckbox } from "@/components/progress-checkbox";
import type { DSAQuestion, SortKey, SortDirection } from "@/types/question-types";
import { createQuestionId } from "@/utils/dsa";

interface QuestionsTableProps {
  questions: DSAQuestion[];
  completedQuestions: Record<string, boolean>;
  onToggleCompleted: (questionId: string) => void;
  onSort: (key: SortKey) => void;
  currentSortKey: SortKey;
  currentSortDir: SortDirection;
  isLoading?: boolean;
}

export function QuestionsTable({
  questions,
  completedQuestions,
  onToggleCompleted,
  onSort,
  currentSortKey,
  currentSortDir,
  isLoading = false,
}: QuestionsTableProps) {
  return (
    <div className="border rounded-md w-full min-h-[450px] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <span className="sr-only">Status</span>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("topic")}
            >
              Topic
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("question")}
            >
              Question
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("difficulty")}
            >
              Difficulty
            </TableHead>
            <TableHead>
              <span className="hidden sm:inline">Code Link</span>
              <span className="sm:hidden">Link</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question) => {
              const questionId = createQuestionId(question);
              const isCompleted = completedQuestions[questionId];

              return (
                <TableRow
                  key={questionId}
                  className={isCompleted ? "bg-green-950/20" : ""}
                >
                  <TableCell>
                    <ProgressCheckbox
                      checked={isCompleted}
                      onCheckedChange={() => onToggleCompleted(questionId)}
                      disabled={isLoading}
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
                          ? "bg-green-950/20 text-green-500 border-green-500"
                          : question.difficulty === "Medium"
                          ? "bg-yellow-950/20 text-yellow-500 border-yellow-500"
                          : "bg-red-950/20 text-red-500 border-red-500"
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
                        className="text-blue-500 hover:underline"
                      >
                        <span className="hidden sm:inline">View Problem</span>
                        <span className="sm:hidden">View</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No questions found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 