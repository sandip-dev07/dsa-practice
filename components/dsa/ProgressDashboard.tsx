import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { memo, useMemo } from "react";
import type { TopicCompletion, DifficultyCompletion, CompletionCount } from "@/types/question-types";
import { StrikeGridData } from "@/hooks/use-progress";
import StrikeGrid from "./StrikeGrid";

interface ProgressDashboardProps {
  completedCounts: CompletionCount;
  difficultyCompletion: DifficultyCompletion;
  topicCompletion: TopicCompletion;
  strikeGridData: StrikeGridData;
}

const ProgressDashboardComponent: React.FC<ProgressDashboardProps> = ({
  completedCounts,
  difficultyCompletion,
  topicCompletion,
  strikeGridData,
}) => {
  // Memoized calculations to prevent unnecessary re-computations
  const remainingCount = useMemo(() =>
    completedCounts.total - completedCounts.completed,
    [completedCounts.total, completedCounts.completed]
  );

  // Memoized sorted topics to prevent sorting on every render
  const sortedTopics = useMemo(() =>
    Object.entries(topicCompletion)
      .sort(([, a], [, b]) => b.percentage - a.percentage),
    [topicCompletion]
  );

  // Memoized topic items to prevent re-rendering of topic cards
  const topicItems = useMemo(() =>
    sortedTopics.map(([topicName, data], index) => {
      // Cycle through modern color schemes for variety
      const colorSchemes = [
        {
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-700 dark:text-blue-300",
          progress: "[&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500"
        },
        {
          bg: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/10",
          border: "border-purple-200 dark:border-purple-800",
          text: "text-purple-700 dark:text-purple-300",
          progress: "[&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-violet-500"
        },
        {
          bg: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/10",
          border: "border-teal-200 dark:border-teal-800",
          text: "text-teal-700 dark:text-teal-300",
          progress: "[&>div]:bg-gradient-to-r [&>div]:from-teal-500 [&>div]:to-cyan-500"
        },
        {
          bg: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/10",
          border: "border-pink-200 dark:border-pink-800",
          text: "text-pink-700 dark:text-pink-300",
          progress: "[&>div]:bg-gradient-to-r [&>div]:from-pink-500 [&>div]:to-rose-500"
        }
      ];

      const colorScheme = colorSchemes[index % colorSchemes.length];

      return (
        <div
          key={topicName}
          className={`${colorScheme.bg} p-3 sm:p-4 rounded-xl border ${colorScheme.border} shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-sm sm:text-base truncate pr-2 text-gray-800 dark:text-gray-200">
              {topicName}
            </span>
            <span className={`text-sm font-semibold ${colorScheme.text}`}>
              {data.percentage}%
            </span>
          </div>
          <Progress
            value={data.percentage}
            className={`h-3 bg-gray-100 dark:bg-gray-800 ${colorScheme.progress}`}
          />
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
            {data.completed} of {data.total} completed
          </div>
        </div>
      );
    }),
    [sortedTopics]
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Strike Grid - GitHub Style Contribution Graph */}
      <StrikeGrid strikeGridData={strikeGridData} />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Completion Summary</CardTitle>
          <CardDescription>Quick overview of your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 sm:p-4 rounded-xl shadow-sm">
              <div className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                Total Completed
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-emerald-800 dark:text-emerald-200">
                {completedCounts.completed}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 sm:p-4 rounded-xl shadow-sm">
              <div className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium">
                Remaining
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-amber-800 dark:text-amber-200">
                {remainingCount}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 sm:p-4 rounded-xl shadow-sm">
              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                Total Questions
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-blue-800 dark:text-blue-200">
                {completedCounts.total}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/20 border border-violet-200 dark:border-violet-800 p-3 sm:p-4 rounded-xl shadow-sm">
              <div className="text-xs sm:text-sm text-violet-700 dark:text-violet-300 font-medium">
                Completion Rate
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-violet-800 dark:text-violet-200">
                {completedCounts.percentage}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Progress by Difficulty</CardTitle>
          <CardDescription>Your progress across different difficulty levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600 font-semibold px-3 py-1"
                  >
                    Easy
                  </Badge>
                  <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {difficultyCompletion.Easy.completed} of{" "}
                    {difficultyCompletion.Easy.total} completed
                  </span>
                </div>
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {difficultyCompletion.Easy.percentage}%
                </span>
              </div>
              <Progress
                value={difficultyCompletion.Easy.percentage}
                className="h-3 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-green-500"
              />
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600 font-semibold px-3 py-1"
                  >
                    Medium
                  </Badge>
                  <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {difficultyCompletion.Medium.completed} of{" "}
                    {difficultyCompletion.Medium.total} completed
                  </span>
                </div>
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                  {difficultyCompletion.Medium.percentage}%
                </span>
              </div>
              <Progress
                value={difficultyCompletion.Medium.percentage}
                className="h-3 bg-amber-100 dark:bg-amber-950 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-orange-500"
              />
            </div>

            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/10 p-4 rounded-xl border border-red-200 dark:border-red-800">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600 font-semibold px-3 py-1"
                  >
                    Hard
                  </Badge>
                  <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {difficultyCompletion.Hard.completed} of{" "}
                    {difficultyCompletion.Hard.total} completed
                  </span>
                </div>
                <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                  {difficultyCompletion.Hard.percentage}%
                </span>
              </div>
              <Progress
                value={difficultyCompletion.Hard.percentage}
                className="h-3 bg-red-100 dark:bg-red-950 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-rose-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Progress by Topic</CardTitle>
          <CardDescription>Your progress across different DSA topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {topicItems}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ProgressDashboardComponent.displayName = "ProgressDashboardComponent";

export const ProgressDashboard = memo(ProgressDashboardComponent); 