import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export function useDSAQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get params from URL
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const topic = searchParams.get("topic") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const sortKey = (searchParams.get("sortKey") as SortKey) || "";
  const sortDir = (searchParams.get("sortDir") as SortDirection) || "asc";
  const showCompleted = (searchParams.get("showCompleted") as CompletedFilter) || "all";
  const activeTab = (searchParams.get("tab") as TabValue) || "questions";

  const [filteredQuestions, setFilteredQuestions] = useState<DSAQuestion[]>(dsaQuestions);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const [completedQuestions, setCompletedQuestions] = useState<CompletedQuestionsMap>({});
  const [isClient, setIsClient] = useState<boolean>(false);

  const questionsPerPage = 10;
  const currentPage = Number.parseInt(page);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Get unique topics for filter dropdown
  const topics = Array.from(new Set(dsaQuestions.map((q) => q.topic)));

  // Load completed questions from localStorage on initial render
  useEffect(() => {
    setIsClient(true);
    const storedCompleted = localStorage.getItem("completedDSAQuestions");
    if (storedCompleted) {
      setCompletedQuestions(JSON.parse(storedCompleted));
    }
  }, []);

  // Save completed questions to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        "completedDSAQuestions",
        JSON.stringify(completedQuestions)
      );
    }
  }, [completedQuestions, isClient]);

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

  // Toggle completed state for a question
  const toggleCompleted = (questionId: string): void => {
    setCompletedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
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

  // Get current page questions
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  // Calculate statistics
  const topicCounts = calculateTopicCounts(dsaQuestions);
  const difficultyCounts = calculateDifficultyCounts(dsaQuestions);
  const completedCounts = calculateCompletedCounts(completedQuestions, dsaQuestions.length);
  const topicCompletion = calculateTopicCompletion(dsaQuestions, completedQuestions, topics);
  const difficultyCompletion = calculateDifficultyCompletion(dsaQuestions, completedQuestions);

  return {
    // State
    filteredQuestions,
    currentQuestions,
    inputSearch,
    completedQuestions,
    isClient,
    currentPage,
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

    // Handlers
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