import useSWR, { mutate, SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { swrConfig } from "@/lib/swr-config";
import { useSession } from "next-auth/react";

// Types for API responses
interface ProgressItem {
  id: string;
  question: string;
  topic: string;
  solved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotesData {
  id?: string;
  content?: string;
  updatedAt?: string;
}

interface UpdateProgressData {
  question: string;
  topic: string;
  solved: boolean;
}

interface SaveNotesData {
  question: string;
  topic: string;
  content: string;
}

// Using centralized SWR configuration

// Hook for fetching user progress
export function useUserProgress() {
  const { data: session, status } = useSession();

  const { data, error, isLoading, mutate: mutateProgress } = useSWR<ProgressItem[]>(
    status === "authenticated" ? "/api/progress" : null,
    fetcher,
    {
      ...swrConfig,
      fallbackData: [],
    }
  );

  return {
    progress: data || [],
    isLoading,
    error,
    mutateProgress,
  };
}

// Hook for updating progress (mutation)
export function useUpdateProgress() {
  const { data: session } = useSession();

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/progress",
    async (url: string, { arg }: { arg: UpdateProgressData }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update progress");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        // Revalidate the progress data after successful mutation
        mutate("/api/progress");
      },
      throwOnError: false,
    }
  );

  return {
    updateProgress: trigger,
    isUpdating: isMutating,
    error,
  };
}

// Hook for fetching notes for a specific question/topic
export function useNotes(question: string, topic: string) {
  const { data: session, status } = useSession();

  const { data, error, isLoading, mutate: mutateNotes } = useSWR<NotesData | null>(
    status === "authenticated" && question && topic
      ? `/api/notes?question=${encodeURIComponent(question)}&topic=${encodeURIComponent(topic)}`
      : null,
    fetcher,
    {
      ...swrConfig,
      fallbackData: null,
    }
  );

  return {
    notes: data,
    isLoading,
    error,
    mutateNotes,
  };
}

// Hook for saving notes (mutation)
export function useSaveNotes() {
  const { data: session } = useSession();

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/notes",
    async (url: string, { arg }: { arg: SaveNotesData }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save notes");
      }

      return response.json();
    },
    {
      onSuccess: (data, key, config) => {
        // Revalidate the specific notes data after successful save
        // The key contains the mutation data, but we need to access it differently
        // For now, we'll revalidate all notes-related data
        mutate((key) => typeof key === 'string' && key.startsWith('/api/notes'));
      },
      throwOnError: false,
    }
  );

  return {
    saveNotes: trigger,
    isSaving: isMutating,
    error,
  };
}

// Hook for fetching all user notes (for bulk operations)
// Note: This is disabled since the API requires question/topic parameters
export function useAllNotes() {
  // Return empty data since we can't fetch all notes at once
  return {
    notes: {} as Record<string, NotesData>,
    isLoading: false,
    error: null,
    mutateAllNotes: () => {},
  };
}
