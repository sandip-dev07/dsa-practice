import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { sheets, type SheetType } from "@/data/questions";
import type {
  CompletedQuestionsMap,
  TabValue,
  CompletedFilter,
  SortKey,
  SortDirection,
} from "@/types/question-types";
import {
  createQuestionId,
  validateCompletedQuestions,
  calculateTopicCounts,
  calculateDifficultyCounts,
  calculateCompletedCounts,
  calculateTopicCompletion,
  calculateDifficultyCompletion,
  filterQuestions,
} from "@/utils/dsa";
import { toast } from "sonner";
import { useLoginDialog } from "@/hooks/use-login-dialog";
import { useUserProgress, useUpdateProgress, useAllNotes } from "./use-api";

// Constants
const QUESTIONS_PER_PAGE = 15;
const DEFAULT_PAGE = 1;

export function useDSAQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const loginDialog = useLoginDialog();

  // SWR hooks for data fetching
  const { progress, isLoading: progressLoading } = useUserProgress();
  const { notes: allNotes, isLoading: notesLoading } = useAllNotes();
  const { updateProgress: updateProgressMutation, isUpdating } =
    useUpdateProgress();

  // Memoized URL params
  const urlParams = useMemo(
    () => ({
      activeTab: (searchParams.get("tab") as TabValue) || "questions",
      search: searchParams.get("search") || "",
      sheet: (searchParams.get("sheet") as SheetType) || "striver",
      topic: searchParams.get("topic") || "all",
      difficulty: searchParams.get("difficulty") || "all",
      showCompleted:
        (searchParams.get("completed") as CompletedFilter) || "all",
      sortKey: (searchParams.get("sortKey") as SortKey) || "topic",
      sortDir: (searchParams.get("sortDir") as SortDirection) || "asc",
      page: Math.max(1, parseInt(searchParams.get("page") || "1", 10)),
    }),
    [searchParams]
  );

  // State
  const [inputSearch, setInputSearch] = useState(urlParams.search);

  // Memoized selected sheet questions
  const selectedSheetQuestions = useMemo(
    () => sheets[urlParams.sheet],
    [urlParams.sheet]
  );

  // Memoized completed questions from progress data with validation
  const completedQuestions = useMemo<CompletedQuestionsMap>(() => {
    const progressMap: CompletedQuestionsMap = {};
    progress.forEach((item) => {
      if (item.solved && item.questionId) {
        progressMap[item.questionId] = true;
      }
    });

    // Validate against current sheet questions to ensure consistency
    return validateCompletedQuestions(progressMap, selectedSheetQuestions);
  }, [progress, selectedSheetQuestions]);

  // Memoized notes data from all notes
  const notesData = useMemo<Record<string, string>>(() => {
    const notesMap: Record<string, string> = {};
    Object.entries(allNotes).forEach(([questionTopic, noteData]) => {
      if (noteData?.content) {
        notesMap[questionTopic] = noteData.content;
      }
    });
    return notesMap;
  }, [allNotes]);

  // Combined loading state
  const isLoading = progressLoading || notesLoading;

  // Memoized topics array (computed once)
  const topics = useMemo(
    () => Array.from(new Set(selectedSheetQuestions.map((q) => q.topic))),
    [selectedSheetQuestions]
  );

  // Memoized filtered questions
  const filteredQuestions = useMemo(
    () =>
      filterQuestions(selectedSheetQuestions, {
        search: urlParams.search,
        topic: urlParams.topic,
        difficulty: urlParams.difficulty,
        showCompleted: urlParams.showCompleted,
        completedQuestions,
        sortKey: urlParams.sortKey,
        sortDir: urlParams.sortDir,
      }),
    [
      selectedSheetQuestions,
      urlParams.search,
      urlParams.topic,
      urlParams.difficulty,
      urlParams.showCompleted,
      urlParams.sortKey,
      urlParams.sortDir,
      completedQuestions,
    ]
  );

  // Memoized pagination calculations
  const pagination = useMemo(
    () => ({
      totalPages: Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE),
      currentPage: Math.min(
        urlParams.page,
        Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE) || 1
      ),
      questionsPerPage: QUESTIONS_PER_PAGE,
    }),
    [filteredQuestions.length, urlParams.page]
  );

  // Memoized current page questions
  const currentQuestions = useMemo(
    () =>
      filteredQuestions.slice(
        (pagination.currentPage - 1) * pagination.questionsPerPage,
        pagination.currentPage * pagination.questionsPerPage
      ),
    [filteredQuestions, pagination.currentPage, pagination.questionsPerPage]
  );

  // Update search input when URL param changes
  useEffect(() => {
    setInputSearch(urlParams.search);
  }, [urlParams.search]);

  // Memoized toggle completed function
  const toggleCompleted = useCallback(
    async (questionId: string): Promise<void> => {
      if (status !== "authenticated") {
        loginDialog.onOpen();
        return;
      }

      // Find the question by its ID
      const question = selectedSheetQuestions.find(
        (q) => createQuestionId(q) === questionId
      );
      if (!question) return;

      const newSolvedState = !completedQuestions[questionId];

      try {
        const result = await updateProgressMutation({
          questionId: questionId,
          topic: question.topic,
          solved: newSolvedState,
        });

        if (!result) {
          toast.error("Failed to update progress");
        }
      } catch (error) {
        console.error("Error updating progress:", error);
        toast.error("Failed to update progress");
      }
    },
    [
      status,
      completedQuestions,
      loginDialog,
      updateProgressMutation,
      selectedSheetQuestions,
    ]
  );

  // Memoized query string creator
  const createQueryString = useCallback(
    (params: Record<string, string>): string => {
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
    },
    [searchParams]
  );

  // Memoized event handlers
  const handleTabChange = useCallback(
    (value: string): void => {
      router.push(`?${createQueryString({ tab: value })}`);
    },
    [router, createQueryString]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInputSearch(e.target.value);
    },
    []
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      router.push(`?${createQueryString({ search: inputSearch, page: "1" })}`);
    },
    [router, createQueryString, inputSearch]
  );

  const handleTopicChange = useCallback(
    (value: string): void => {
      router.push(`?${createQueryString({ topic: value, page: "1" })}`);
    },
    [router, createQueryString]
  );

  const handleDifficultyChange = useCallback(
    (value: string): void => {
      router.push(`?${createQueryString({ difficulty: value, page: "1" })}`);
    },
    [router, createQueryString]
  );

  const handleCompletedChange = useCallback(
    (value: CompletedFilter): void => {
      router.push(`?${createQueryString({ completed: value, page: "1" })}`);
    },
    [router, createQueryString]
  );

  const handleSheetChange = useCallback(
    (value: SheetType): void => {
      router.push(`?${createQueryString({ sheet: value, page: "1" })}`);
    },
    [router, createQueryString]
  );

  const handlePageChange = useCallback(
    (newPage: number): void => {
      router.push(`?${createQueryString({ page: newPage.toString() })}`);
    },
    [router, createQueryString]
  );

  const handleSort = useCallback(
    (key: SortKey): void => {
      const direction: SortDirection =
        urlParams.sortKey === key && urlParams.sortDir === "asc"
          ? "desc"
          : "asc";
      router.push(
        `?${createQueryString({ sortKey: key, sortDir: direction })}`
      );
    },
    [router, createQueryString, urlParams.sortKey, urlParams.sortDir]
  );

  // Memoized statistics calculations
  const statistics = useMemo(
    () => ({
      topicCounts: calculateTopicCounts(selectedSheetQuestions),
      difficultyCounts: calculateDifficultyCounts(selectedSheetQuestions),
      completedCounts: calculateCompletedCounts(
        completedQuestions,
        selectedSheetQuestions.length
      ),
      topicCompletion: calculateTopicCompletion(
        selectedSheetQuestions,
        completedQuestions,
        topics
      ),
      difficultyCompletion: calculateDifficultyCompletion(
        selectedSheetQuestions,
        completedQuestions
      ),
    }),
    [selectedSheetQuestions, completedQuestions, topics]
  );

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
    selectedSheet: urlParams.sheet,
    topic: urlParams.topic,
    difficulty: urlParams.difficulty,
    showCompleted: urlParams.showCompleted,
    sortKey: urlParams.sortKey,
    sortDir: urlParams.sortDir,
    handleTabChange,
    handleSearchChange,
    handleSearchSubmit,
    handleSheetChange,
    handleTopicChange,
    handleDifficultyChange,
    handleCompletedChange,
    handlePageChange,
    handleSort,
    toggleCompleted,
  };
}
