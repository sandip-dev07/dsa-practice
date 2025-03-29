import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface Progress {
  id: string;
  question: string;
  topic: string;
  solved: boolean;
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

  return {
    progress,
    loading,
    error,
    updateProgress,
    isQuestionSolved,
  };
} 