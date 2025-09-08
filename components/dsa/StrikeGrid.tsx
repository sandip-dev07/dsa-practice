import React, { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StrikeGridData } from "@/hooks/use-progress";

interface StrikeGridProps {
  strikeGridData: StrikeGridData;
}

const StrikeGrid: React.FC<StrikeGridProps> = ({ strikeGridData }) => {
  const { contributions, maxCount } = strikeGridData;

  // Build a map for quick date -> count lookup
  const countByDate = new Map<string, number>();
  contributions.forEach(({ date, count }) => {
    countByDate.set(date, count);
  });

  // Determine the grid range: last 52 weeks ending this week (Sunday-start)
  const today = new Date();
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endDay = end.getDay(); // 0=Sun
  const lastSunday = new Date(end);
  lastSunday.setDate(end.getDate() - endDay);
  const startSunday = new Date(lastSunday);
  startSunday.setDate(lastSunday.getDate() - 7 * 51);

  // Generate 52 weeks x 7 days grid from startSunday
  const recentWeeks: Array<Array<{ date: string; count: number }>> = [];
  for (let w = 0; w < 52; w++) {
    const week: Array<{ date: string; count: number }> = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startSunday);
      cellDate.setDate(startSunday.getDate() + w * 7 + d);
      const key = cellDate.toISOString().split('T')[0];
      week.push({
        date: key,
        count: countByDate.get(key) || 0,
      });
    }
    recentWeeks.push(week);
  }

  // Calculate color intensity based on contribution count
  const getCellColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count === 1) return "bg-green-200 dark:bg-green-900";
    if (count === 2) return "bg-green-300 dark:bg-green-800";
    if (count === 3) return "bg-green-400 dark:bg-green-700";
    if (count === 4) return "bg-green-500 dark:bg-green-600";
    return "bg-green-600 dark:bg-green-500"; // 5+
  };

  // Month labels aligned to week columns: show label when a new month starts within the week
  const monthLabels: string[] = (() => {
    let previousMonth = -1;
    const labels: string[] = [];
    for (let w = 0; w < recentWeeks.length; w++) {
      const week = recentWeeks[w];
      // If any day in the week is the 1st of a month, label that month
      const firstOfMonthDay = week.find((d) => new Date(d.date).getDate() === 1);
      const labelDate = firstOfMonthDay ? new Date(firstOfMonthDay.date) : new Date(week[0].date);
      const monthIndex = labelDate.getMonth();
      if (w === 0 || monthIndex !== previousMonth) {
        labels.push(labelDate.toLocaleDateString('en-US', { month: 'short' }));
        previousMonth = monthIndex;
      } else {
        labels.push('');
      }
    }
    return labels;
  })();

  // Day labels for the left side
  const dayLabels = ['Sat', '', 'Mon', '', 'Wed', '', 'Fri'];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Problem Solving Streak</CardTitle>
        
      </CardHeader>
      <CardContent>
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col mr-2 text-xs text-gray-500 dark:text-gray-400 mt-5">
            {dayLabels.map((day, index) => (
              <div key={index} className="h-4 flex items-center">
                {day}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex-1 overflow-x-auto">
            {/* Month labels aligned with week columns */}
            <div className="flex mb-2 text-xs text-gray-500 dark:text-gray-400 gap-1">
              {monthLabels.map((month, index) => (
                <div key={index} className="w-3 text-center">
                  {month}
                </div>
              ))}
            </div>

            {/* Grid container */}
            <div className="flex gap-1">
              {recentWeeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`
                        w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-700
                        ${day.date ? getCellColor(day.count) : 'bg-transparent'}
                        hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50
                        transition-all duration-200
                        cursor-pointer
                      `}
                      title={
                        day.date
                          ? `${day.count} problems on ${new Date(day.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}`
                          : ''
                      }
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900 border border-gray-200 dark:border-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800 border border-gray-200 dark:border-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700 border border-gray-200 dark:border-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600 border border-gray-200 dark:border-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500 border border-gray-200 dark:border-gray-700"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {contributions.reduce((sum, day) => sum + day.count, 0)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Total Solved
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {Math.max(...contributions.map(d => d.count), 0)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Max/Day
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {contributions.filter(d => d.count > 0).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Active Days
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {(contributions.reduce((sum, day) => sum + day.count, 0) / Math.max(contributions.filter(d => d.count > 0).length, 1)).toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Avg/Day
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

StrikeGrid.displayName = "StrikeGrid";

export default memo(StrikeGrid);
