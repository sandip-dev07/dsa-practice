import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";

interface Progress {
  id: string;
  question: string;
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
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(status === "loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProgress();
    } else if (status === "unauthenticated") {
      setProgress([]);
      setLoading(false);
    }
  }, [status]);

  const fetchProgress = async () => {
    try {
      setError(null);
      const response = await fetch("/api/progress");
      if (!response.ok) {
        throw new Error("Failed to fetch progress");
      }
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error("Error fetching progress:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch progress");
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (question: string, topic: string, solved: boolean) => {
    if (status !== "authenticated") return false;

    try {
      setError(null);
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, topic, solved }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const updatedProgress = await response.json();
      setProgress((prev) => {
        const existingIndex = prev.findIndex((p) => p.question === question);
        if (existingIndex >= 0) {
          const newProgress = [...prev];
          newProgress[existingIndex] = updatedProgress;
          return newProgress;
        }
        return [...prev, updatedProgress];
      });
      return true;
    } catch (error) {
      console.error("Error updating progress:", error);
      setError(error instanceof Error ? error.message : "Failed to update progress");
      return false;
    }
  };

  const isQuestionSolved = (question: string) => {
    return progress.some((p) => p.question === question && p.solved);
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
    loading,
    error,
    updateProgress,
    isQuestionSolved,
    strikeGridData,
  };
} 