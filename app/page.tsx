"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ListChecks, BarChart } from "lucide-react";
import { QuestionsTable } from "@/components/dsa/QuestionsTable";
import { Filters } from "@/components/dsa/Filters";
import { Pagination } from "@/components/dsa/Pagination";
import { ProgressDashboard } from "@/components/dsa/ProgressDashboard";
import { TableSkeleton } from "@/components/dsa/TableSkeleton";
import { ProgressSkeleton } from "@/components/dsa/ProgressSkeleton";
import { UserNav } from "@/components/UserNav";
import { useDSAQuestions } from "@/hooks/useDSAQuestions";

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
    search,
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

  // Set dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <div className="container mx-auto max-w-7xl py-4 sm:py-8 px-2 sm:px-4">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="mb-4 sm:mb-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList className="grid w-full sm:w-fit grid-cols-2">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Questions</span>
              <span className="sm:hidden">Q</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
              <span className="sm:hidden">P</span>
            </TabsTrigger>
          </TabsList>

          {!isLoading && (
            <div className="bg-card p-2 rounded-lg border shadow-sm w-full sm:w-auto">
              <div className="flex flex-row text-sm justify-between items-center gap-2 sm:gap-4">
                <h2 className="font-medium">Completed</h2>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>
                    {completedCounts.completed} of {completedCounts.total} (
                    {Math.round(
                      (completedCounts.completed / completedCounts.total) * 100
                    ) || 0}
                    %)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <TabsContent value="questions">
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
                totalItems={currentQuestions.length}
                itemsPerPage={questionsPerPage}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="progress">
          {isLoading ? (
            <ProgressSkeleton />
          ) : (
            <ProgressDashboard
              completedCounts={completedCounts}
              difficultyCompletion={difficultyCompletion}
              topicCompletion={topicCompletion}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
