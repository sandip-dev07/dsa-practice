import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { dsaQuestions } from "@/data/striver-set";
import type {
  DSAQuestion,
  CompletedQuestionsMap,
  TopicCount,
  DifficultyCount,
  CompletionCount,
  TopicCompletion,
  DifficultyCompletion,
  TabValue,
  CompletedFilter,
  SortKey,
  SortDirection,
} from "@/types/question-types";
import {
  createQuestionId,
  calculateTopicCounts,
  calculateDifficultyCounts,
  calculateCompletedCounts,
  calculateTopicCompletion,
  calculateDifficultyCompletion,
  filterQuestions,
} from "@/utils/dsa";
import { toast } from "sonner";
import { useLoginDialog } from "@/hooks/use-login-dialog";

// Constants
const QUESTIONS_PER_PAGE = 15;
const DEFAULT_PAGE = 1;

export function useDSAQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const loginDialog = useLoginDialog();

  // Memoized URL params
  const urlParams = useMemo(() => ({
    activeTab: (searchParams.get("tab") as TabValue) || "questions",
    search: searchParams.get("search") || "",
    topic: searchParams.get("topic") || "all",
    difficulty: searchParams.get("difficulty") || "all",
    showCompleted: (searchParams.get("completed") as CompletedFilter) || "all",
    sortKey: (searchParams.get("sortKey") as SortKey) || "topic",
    sortDir: (searchParams.get("sortDir") as SortDirection) || "asc",
    page: Math.max(1, parseInt(searchParams.get("page") || "1", 10)),
  }), [searchParams]);

  // State
  const [inputSearch, setInputSearch] = useState(urlParams.search);
  const [completedQuestions, setCompletedQuestions] = useState<CompletedQuestionsMap>({});
  const [notesData, setNotesData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Memoized topics array (computed once)
  const topics = useMemo(() =>
    Array.from(new Set(dsaQuestions.map((q) => q.topic))),
    []
  );

  // Memoized filtered questions
  const filteredQuestions = useMemo(() =>
    filterQuestions(dsaQuestions, {
      search: urlParams.search,
      topic: urlParams.topic,
      difficulty: urlParams.difficulty,
      showCompleted: urlParams.showCompleted,
      completedQuestions,
      sortKey: urlParams.sortKey,
      sortDir: urlParams.sortDir,
    }),
    [urlParams.search, urlParams.topic, urlParams.difficulty, urlParams.showCompleted, urlParams.sortKey, urlParams.sortDir, completedQuestions]
  );

  // Memoized pagination calculations
  const pagination = useMemo(() => ({
    totalPages: Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE),
    currentPage: Math.min(urlParams.page, Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE) || 1),
    questionsPerPage: QUESTIONS_PER_PAGE,
  }), [filteredQuestions.length, urlParams.page]);

  // Memoized current page questions
  const currentQuestions = useMemo(() =>
    filteredQuestions.slice(
      (pagination.currentPage - 1) * pagination.questionsPerPage,
      pagination.currentPage * pagination.questionsPerPage
    ),
    [filteredQuestions, pagination.currentPage, pagination.questionsPerPage]
  );

  // Optimized data fetching effect
  useEffect(() => {
    let isMounted = true;

    const fetchProgress = async () => {
      if (status === "authenticated") {
        try {
          // Parallel API calls for better performance
          const [progressResponse, notesResponse] = await Promise.all([
            fetch("/api/progress"),
            fetch("/api/notes")
          ]);

          if (!isMounted) return;

          // Handle progress data
          if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            const progressMap: CompletedQuestionsMap = {};
            progressData.forEach((item: { question: string; solved: boolean }) => {
              if (item.solved) {
                progressMap[item.question] = true;
              }
            });
            setCompletedQuestions(progressMap);
          }

          // Handle notes data
          if (notesResponse.ok) {
            const notesData = await notesResponse.json();
            setNotesData(notesData);
          }
        } catch (error) {
          if (isMounted) {
            toast.error("Failed to load data");
          }
        }
      } else {
        setCompletedQuestions({});
        setNotesData({});
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    fetchProgress();

    return () => {
      isMounted = false;
    };
  }, [status]);

  // Memoized toggle completed function
  const toggleCompleted = useCallback(async (questionId: string): Promise<void> => {
    if (status !== "authenticated") {
      loginDialog.onOpen();
      return;
    }

    // Find the question by its ID
    const question = dsaQuestions.find(q => createQuestionId(q) === questionId);
    if (!question) return;

    const newSolvedState = !completedQuestions[questionId];

    // Optimistically update UI
    setCompletedQuestions((prev) => ({
      ...prev,
      [questionId]: newSolvedState,
    }));

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionId,
          topic: question.topic,
          solved: newSolvedState,
        }),
      });

      if (!response.ok) {
        // Revert optimistic update if request failed
        setCompletedQuestions((prev) => ({
          ...prev,
          [questionId]: !newSolvedState,
        }));

        const data = await response.json();
        if (response.status === 429) {
          const reset = response.headers.get("X-RateLimit-Reset");
          const resetInSeconds = reset ? parseInt(reset, 10) : 60;
          toast.error(
            `Rate limit exceeded. Please wait ${resetInSeconds} seconds before trying again.`
          );
        } else {
          throw new Error(data.error || "Failed to update progress");
        }
        return;
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(
        `Question ${newSolvedState ? "marked as completed" : "marked as incomplete"}`
      );
    } catch (error) {
      toast.error("Failed to update progress");
    }
  }, [status, completedQuestions, loginDialog]);

  // Memoized query string creator
  const createQueryString = useCallback((params: Record<string, string>): string => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Update or delete parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    return newSearchParams.toString();
  }, [searchParams]);

  // Memoized event handlers
  const handleTabChange = useCallback((value: string): void => {
    router.push(`?${createQueryString({ tab: value })}`);
  }, [router, createQueryString]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`?${createQueryString({ search: inputSearch, page: "1" })}`);
  }, [router, createQueryString, inputSearch]);

  const handleTopicChange = useCallback((value: string): void => {
    router.push(`?${createQueryString({ topic: value, page: "1" })}`);
  }, [router, createQueryString]);

  const handleDifficultyChange = useCallback((value: string): void => {
    router.push(`?${createQueryString({ difficulty: value, page: "1" })}`);
  }, [router, createQueryString]);

  const handleCompletedChange = useCallback((value: CompletedFilter): void => {
    router.push(`?${createQueryString({ completed: value, page: "1" })}`);
  }, [router, createQueryString]);

  const handlePageChange = useCallback((newPage: number): void => {
    router.push(`?${createQueryString({ page: newPage.toString() })}`);
  }, [router, createQueryString]);

  const handleSort = useCallback((key: SortKey): void => {
    const direction: SortDirection = (urlParams.sortKey === key && urlParams.sortDir === "asc") ? "desc" : "asc";
    router.push(`?${createQueryString({ sortKey: key, sortDir: direction })}`);
  }, [router, createQueryString, urlParams.sortKey, urlParams.sortDir]);

  // Update search input when URL param changes
  useEffect(() => {
    setInputSearch(urlParams.search);
  }, [urlParams.search]);

  // Memoized statistics calculations
  const statistics = useMemo(() => ({
    topicCounts: calculateTopicCounts(dsaQuestions),
    difficultyCounts: calculateDifficultyCounts(dsaQuestions),
    completedCounts: calculateCompletedCounts(completedQuestions, dsaQuestions.length),
    topicCompletion: calculateTopicCompletion(dsaQuestions, completedQuestions, topics),
    difficultyCompletion: calculateDifficultyCompletion(dsaQuestions, completedQuestions),
  }), [completedQuestions, topics]);

  return {
    currentQuestions,
    inputSearch,
    completedQuestions,
    notesData,
    isLoading,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    questionsPerPage: pagination.questionsPerPage,
    topics,
    topicCounts: statistics.topicCounts,
    difficultyCounts: statistics.difficultyCounts,
    completedCounts: statistics.completedCounts,
    topicCompletion: statistics.topicCompletion,
    difficultyCompletion: statistics.difficultyCompletion,
    activeTab: urlParams.activeTab,
    search: urlParams.search,
    topic: urlParams.topic,
    difficulty: urlParams.difficulty,
    showCompleted: urlParams.showCompleted,
    sortKey: urlParams.sortKey,
    sortDir: urlParams.sortDir,
    handleTabChange,
    handleSearchChange,
    handleSearchSubmit,
    handleTopicChange,
    handleDifficultyChange,
    handleCompletedChange,
    handlePageChange,
    handleSort,
    toggleCompleted,
  };
} 