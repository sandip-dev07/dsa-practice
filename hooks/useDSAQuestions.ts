import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { dsaQuestions } from "@/data/questions";
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

export function useDSAQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const loginDialog = useLoginDialog();

  // Get URL params
  const activeTab = searchParams.get("tab") || "questions";
  const search = searchParams.get("search") || "";
  const topic = searchParams.get("topic") || "all";
  const difficulty = searchParams.get("difficulty") || "all";
  const showCompleted = (searchParams.get("completed") as CompletedFilter) || "all";
  const sortKey = (searchParams.get("sortKey") as SortKey) || "topic";
  const sortDir = (searchParams.get("sortDir") as SortDirection) || "asc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // State
  const [inputSearch, setInputSearch] = useState(search);
  const [completedQuestions, setCompletedQuestions] = useState<CompletedQuestionsMap>({});
  const [notesData, setNotesData] = useState<Record<string, string>>({});
  const [filteredQuestions, setFilteredQuestions] = useState(dsaQuestions);
  const [isLoading, setIsLoading] = useState(true);
  const questionsPerPage = 10;
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Get unique topics for filter dropdown
  const topics = Array.from(new Set(dsaQuestions.map((q) => q.topic)));

  // Load completed questions and notes from API on initial render and when auth status changes
  useEffect(() => {
    const fetchProgress = async () => {
      if (status === "authenticated") {
        try {
          // Fetch completed questions
          const progressResponse = await fetch("/api/progress");
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

          // Fetch notes
          const notesResponse = await fetch("/api/notes");
          if (notesResponse.ok) {
            const notesData = await notesResponse.json();
            setNotesData(notesData);
          }
        } catch (error) {
          toast.error("Failed to load data");
        }
      } else {
        setCompletedQuestions({});
        setNotesData({});
      }
      setIsLoading(false);
    };

    fetchProgress();
  }, [status]);

  // Toggle completed state for a question
  const toggleCompleted = async (questionId: string): Promise<void> => {
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
  };

  // Create a new URLSearchParams instance
  const createQueryString = (params: Record<string, string>): string => {
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
  };

  // Handle tab change
  const handleTabChange = (value: string): void => {
    router.push(`?${createQueryString({ tab: value })}`);
  };

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(e.target.value);
  };

  // Update URL when search input is submitted
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`?${createQueryString({ search: inputSearch, page: "1" })}`);
  };

  // Handle topic filter change
  const handleTopicChange = (value: string): void => {
    router.push(`?${createQueryString({ topic: value, page: "1" })}`);
  };

  // Handle difficulty filter change
  const handleDifficultyChange = (value: string): void => {
    router.push(`?${createQueryString({ difficulty: value, page: "1" })}`);
  };

  // Handle completed filter change
  const handleCompletedChange = (value: CompletedFilter): void => {
    router.push(`?${createQueryString({ showCompleted: value, page: "1" })}`);
  };

  // Handle pagination
  const handlePageChange = (newPage: number): void => {
    router.push(`?${createQueryString({ page: newPage.toString() })}`);
  };

  // Handle sorting
  const handleSort = (key: SortKey): void => {
    let direction: SortDirection = "asc";
    if (sortKey === key && sortDir === "asc") {
      direction = "desc";
    }
    router.push(`?${createQueryString({ sortKey: key, sortDir: direction })}`);
  };

  // Apply filters and search
  useEffect(() => {
    const filtered = filterQuestions(dsaQuestions, {
      search,
      topic,
      difficulty,
      showCompleted,
      completedQuestions,
      sortKey,
      sortDir,
    });
    setFilteredQuestions(filtered);
  }, [search, topic, difficulty, sortKey, sortDir, showCompleted, completedQuestions]);

  // Update search input when URL param changes
  useEffect(() => {
    setInputSearch(search);
  }, [search]);

  // Update current page when URL param changes
  useEffect(() => {
    const newPage = parseInt(searchParams.get("page") || "1", 10);
    if (newPage !== page) {
      router.push(`?${createQueryString({ page: newPage.toString() })}`);
    }
  }, [searchParams]);

  // Get current page questions
  const currentQuestions = filteredQuestions.slice(
    (page - 1) * questionsPerPage,
    page * questionsPerPage
  );

  // Calculate statistics
  const topicCounts = calculateTopicCounts(dsaQuestions);
  const difficultyCounts = calculateDifficultyCounts(dsaQuestions);
  const completedCounts = calculateCompletedCounts(completedQuestions, dsaQuestions.length);
  const topicCompletion = calculateTopicCompletion(dsaQuestions, completedQuestions, topics);
  const difficultyCompletion = calculateDifficultyCompletion(dsaQuestions, completedQuestions);

  return {
    currentQuestions,
    inputSearch,
    completedQuestions,
    notesData,
    isLoading,
    currentPage: page,
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
  };
} 