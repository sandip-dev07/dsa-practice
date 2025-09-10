import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useUserProgress, useUpdateProgress } from "./use-api";

interface Progress {
  id: string;
  questionId: string;
  topic: string;
  solved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DailyCompletion {
  date: string;
  count: number;
}

export interface StrikeGridData {
  contributions: DailyCompletion[];
  maxCount: number;
  totalDays: number;
}

export function useProgress() {
  const { status } = useSession();
  const { progress, isLoading, error, mutateProgress } = useUserProgress();
  const { updateProgress: updateProgressMutation, isUpdating, error: updateError } = useUpdateProgress();

  const updateProgress = async (questionId: string, topic: string, solved: boolean) => {
    if (status !== "authenticated") return false;

    try {
      const result = await updateProgressMutation({ questionId, topic, solved });
      return !!result;
    } catch (error) {
      console.error("Error updating progress:", error);
      return false;
    }
  };

  const isQuestionSolved = (questionId: string) => {
    return progress.some((p) => p.questionId === questionId && p.solved);
  };

  // Calculate daily completion data for strike grid
  const strikeGridData = useMemo(() => {
    const completedProgress = progress.filter(p => p.solved);
    const dailyMap = new Map<string, number>();

    // Get date range (last 365 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    // Initialize all days with 0
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      dailyMap.set(dateKey, 0);
    }

    // Count solved problems per day
    completedProgress.forEach(item => {
      const date = new Date(item.updatedAt);
      const dateKey = date.toISOString().split('T')[0];
      if (dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, dailyMap.get(dateKey)! + 1);
      }
    });

    // Convert to array and sort
    const contributions = Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const maxCount = Math.max(...contributions.map(c => c.count));

    return {
      contributions,
      maxCount: maxCount || 1, // Avoid division by zero
      totalDays: contributions.length,
    };
  }, [progress]);

  return {
    progress,
    loading: isLoading,
    error: error || updateError,
    updateProgress,
    isQuestionSolved,
    strikeGridData,
  };
} 