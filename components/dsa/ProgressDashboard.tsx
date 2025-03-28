import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { TopicCompletion, DifficultyCompletion, CompletionCount } from "@/types/question-types";

interface ProgressDashboardProps {
  completedCounts: CompletionCount;
  difficultyCompletion: DifficultyCompletion;
  topicCompletion: TopicCompletion;
}

export function ProgressDashboard({
  completedCounts,
  difficultyCompletion,
  topicCompletion,
}: ProgressDashboardProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Completion Summary</CardTitle>
          <CardDescription>Quick overview of your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-green-950/20 p-3 sm:p-4 rounded-md">
              <div className="text-xs sm:text-sm text-muted-foreground">
                Total Completed
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {completedCounts.completed}
              </div>
            </div>
            <div className="bg-yellow-950/20 p-3 sm:p-4 rounded-md">
              <div className="text-xs sm:text-sm text-muted-foreground">
                Remaining
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {completedCounts.total - completedCounts.completed}
              </div>
            </div>
            <div className="bg-blue-950/20 p-3 sm:p-4 rounded-md">
              <div className="text-xs sm:text-sm text-muted-foreground">
                Total Questions
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {completedCounts.total}
              </div>
            </div>
            <div className="bg-purple-950/20 p-3 sm:p-4 rounded-md">
              <div className="text-xs sm:text-sm text-muted-foreground">
                Completion Rate
              </div>
              <div className="text-xl sm:text-2xl font-bold">
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
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-950/20 text-green-500 border-green-500"
                  >
                    Easy
                  </Badge>
                  <span className="font-medium text-sm sm:text-base">
                    {difficultyCompletion.Easy.completed} of{" "}
                    {difficultyCompletion.Easy.total} completed
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {difficultyCompletion.Easy.percentage}%
                </span>
              </div>
              <Progress
                value={difficultyCompletion.Easy.percentage}
                className="h-2 bg-green-950/20"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-yellow-950/20 text-yellow-500 border-yellow-500"
                  >
                    Medium
                  </Badge>
                  <span className="font-medium text-sm sm:text-base">
                    {difficultyCompletion.Medium.completed} of{" "}
                    {difficultyCompletion.Medium.total} completed
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {difficultyCompletion.Medium.percentage}%
                </span>
              </div>
              <Progress
                value={difficultyCompletion.Medium.percentage}
                className="h-2 bg-yellow-950/20"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-red-950/20 text-red-500 border-red-500"
                  >
                    Hard
                  </Badge>
                  <span className="font-medium text-sm sm:text-base">
                    {difficultyCompletion.Hard.completed} of{" "}
                    {difficultyCompletion.Hard.total} completed
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {difficultyCompletion.Hard.percentage}%
                </span>
              </div>
              <Progress
                value={difficultyCompletion.Hard.percentage}
                className="h-2 bg-red-950/20"
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
            {Object.entries(topicCompletion)
              .sort(([, a], [, b]) => b.percentage - a.percentage)
              .map(([topicName, data]) => (
                <div
                  key={topicName}
                  className="bg-muted/50 p-3 sm:p-4 rounded-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm sm:text-base truncate pr-2">
                      {topicName}
                    </span>
                    <span className="text-sm font-semibold">
                      {data.percentage}%
                    </span>
                  </div>
                  <Progress
                    value={data.percentage}
                    className="h-2 mb-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {data.completed} of {data.total} completed
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 