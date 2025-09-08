"use client";

import { useEffect, useMemo, memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ListChecks, BarChart, TrendingUp } from "lucide-react";
import { QuestionsTable } from "@/components/dsa/QuestionsTable";
import { Filters } from "@/components/dsa/Filters";
import { Pagination } from "@/components/dsa/Pagination";
import { ProgressDashboard } from "@/components/dsa/ProgressDashboard";
import { TableSkeleton } from "@/components/dsa/TableSkeleton";
import { ProgressSkeleton } from "@/components/dsa/ProgressSkeleton";
import { useDSAQuestions } from "@/hooks/useDSAQuestions";

// Memoized progress display component
const ProgressDisplay = memo(({ completedCounts }: { completedCounts: { completed: number; total: number } }) => {
  const progressPercentage = useMemo(() =>
    Math.round((completedCounts.completed / completedCounts.total) * 100) || 0,
    [completedCounts.completed, completedCounts.total]
  );

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 shadow-sm w-full sm:w-fit items-center flex justify-center">
      <div className="flex flex-row text-sm justify-between items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-emerald-800 dark:text-emerald-200">
            {completedCounts.completed} of {completedCounts.total} ({progressPercentage}%)
          </span>
        </div>
      </div>
    </div>
  );
});

ProgressDisplay.displayName = "ProgressDisplay";

// Memoized Questions Tab Content
const QuestionsTabContent = memo(({
  isLoading,
  inputSearch,
  handleSearchChange,
  handleSearchSubmit,
  topic,
  handleTopicChange,
  difficulty,
  handleDifficultyChange,
  showCompleted,
  handleCompletedChange,
  topics,
  topicCounts,
  difficultyCounts,
  currentQuestions,
  completedQuestions,
  handleSort,
  sortKey,
  sortDir,
  currentPage,
  totalPages,
  handlePageChange,
  questionsPerPage,
  totalItems,
  toggleCompleted
}: {
  isLoading: boolean;
  inputSearch: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  topic: string;
  handleTopicChange: (value: string) => void;
  difficulty: string;
  handleDifficultyChange: (value: string) => void;
  showCompleted: any;
  handleCompletedChange: (value: any) => void;
  topics: string[];
  topicCounts: any;
  difficultyCounts: any;
  currentQuestions: any[];
  completedQuestions: Record<string, boolean>;
  handleSort: (key: any) => void;
  sortKey: any;
  sortDir: any;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  questionsPerPage: number;
  totalItems: number;
  toggleCompleted: (questionId: string) => void;
}) => (
  <>
    <Filters
      search={inputSearch}
      onSearchChange={handleSearchChange}
      onSearchSubmit={handleSearchSubmit}
      topic={topic}
      onTopicChange={handleTopicChange}
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      showCompleted={showCompleted}
      onCompletedChange={handleCompletedChange}
      topics={topics}
      topicCounts={topicCounts}
      difficultyCounts={difficultyCounts}
    />

    {isLoading ? (
      <TableSkeleton />
    ) : (
      <>
        <div className="flex mb-4 sm:mb-6 w-full items-start gap-3">
          <QuestionsTable
            questions={currentQuestions}
            completedQuestions={completedQuestions}
            onToggleCompleted={toggleCompleted}
            onSort={handleSort}
            currentSortKey={sortKey}
            currentSortDir={sortDir}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={questionsPerPage}
        />
      </>
    )}
  </>
));

QuestionsTabContent.displayName = "QuestionsTabContent";

// Memoized Progress Tab Content
const ProgressTabContent = memo(({
  isLoading,
  completedCounts,
  difficultyCompletion,
  topicCompletion
}: {
  isLoading: boolean;
  completedCounts: any;
  difficultyCompletion: any;
  topicCompletion: any;
}) => (
  isLoading ? (
    <ProgressSkeleton />
  ) : (
    <ProgressDashboard
      completedCounts={completedCounts}
      difficultyCompletion={difficultyCompletion}
      topicCompletion={topicCompletion}
    />
  )
));

ProgressTabContent.displayName = "ProgressTabContent";

export default function DSAQuestionsPage(): JSX.Element {
  const {
    currentQuestions,
    inputSearch,
    completedQuestions,
    isLoading,
    currentPage,
    totalPages,
    questionsPerPage,
    topics,
    topicCounts,
    difficultyCounts,
    completedCounts,
    topicCompletion,
    difficultyCompletion,
    activeTab,
    topic,
    difficulty,
    showCompleted,
    sortKey,
    sortDir,
    handleTabChange,
    handleSearchChange,
    handleSearchSubmit,
    handleTopicChange,
    handleDifficultyChange,
    handleCompletedChange,
    handlePageChange,
    handleSort,
    toggleCompleted,
  } = useDSAQuestions();

  // Optimized dark mode effect
  useEffect(() => {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem("theme");

    if (!currentTheme || currentTheme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <div className="container mx-auto max-w-7xl py-4 sm:py-8 px-2 sm:px-4">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="mb-4 sm:mb-6"
      >
        <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList className="grid w-full sm:w-fit grid-cols-2">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Questions</span>
              <span className="sm:hidden">Q</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
              <span className="sm:hidden">P</span>
            </TabsTrigger>
          </TabsList>

          {!isLoading && (
            <ProgressDisplay completedCounts={completedCounts} />
          )}
        </div>

        <TabsContent value="questions">
          <QuestionsTabContent
            isLoading={isLoading}
            inputSearch={inputSearch}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            topic={topic}
            handleTopicChange={handleTopicChange}
            difficulty={difficulty}
            handleDifficultyChange={handleDifficultyChange}
            showCompleted={showCompleted}
            handleCompletedChange={handleCompletedChange}
            topics={topics}
            topicCounts={topicCounts}
            difficultyCounts={difficultyCounts}
            currentQuestions={currentQuestions}
            completedQuestions={completedQuestions}
            handleSort={handleSort}
            sortKey={sortKey}
            sortDir={sortDir}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            questionsPerPage={questionsPerPage}
            totalItems={currentQuestions.length}
            toggleCompleted={toggleCompleted}
          />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTabContent
            isLoading={isLoading}
            completedCounts={completedCounts}
            difficultyCompletion={difficultyCompletion}
            topicCompletion={topicCompletion}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
