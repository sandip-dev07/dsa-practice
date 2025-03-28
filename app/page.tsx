"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  CheckCircle2,
  ListChecks,
  BarChart,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { dsaQuestions } from "@/data/questions";
import type {
  DSAQuestion,
  CompletedQuestionsMap,
  TopicCount,
  DifficultyCount,
  CompletionCount,
  TopicCompletion,
  DifficultyCompletion,
} from "@/types/question-types";
import type React from "react";

// Create a unique identifier for each question
const createQuestionId = (question: DSAQuestion): string => {
  return `${question.topic}-${question.question}`.replace(/[^a-zA-Z0-9]/g, "_");
};

type TabValue = "questions" | "progress";
type CompletedFilter = "all" | "completed" | "pending";
type SortKey = "topic" | "question" | "difficulty" | "";
type SortDirection = "asc" | "desc" | "";

export default function DSAQuestionsTable(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get params from URL
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const topic = searchParams.get("topic") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const sortKey = (searchParams.get("sortKey") as SortKey) || "";
  const sortDir = (searchParams.get("sortDir") as SortDirection) || "";
  const showCompleted =
    (searchParams.get("showCompleted") as CompletedFilter) || "all";
  const activeTab = (searchParams.get("tab") as TabValue) || "questions";

  const [filteredQuestions, setFilteredQuestions] =
    useState<DSAQuestion[]>(dsaQuestions);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const [completedQuestions, setCompletedQuestions] =
    useState<CompletedQuestionsMap>({});
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

  useEffect(() => {
    // Set dark mode
    document.documentElement.classList.add("dark");

    // Optional: Remove any light mode class if it exists
    document.documentElement.classList.remove("light");

    // This ensures dark mode persists
    localStorage.setItem("theme", "dark");
  }, []);

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
    let result = dsaQuestions;

    // Apply topic filter
    if (topic && topic !== "all") {
      result = result.filter((q) => q.topic === topic);
    }

    // Apply difficulty filter
    if (difficulty && difficulty !== "all") {
      result = result.filter((q) => q.difficulty === difficulty);
    }

    // Apply completed filter
    if (showCompleted === "completed") {
      result = result.filter((q) => completedQuestions[createQuestionId(q)]);
    } else if (showCompleted === "pending") {
      result = result.filter((q) => !completedQuestions[createQuestionId(q)]);
    }

    // Apply search
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortKey) {
      result = [...result].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return sortDir === "asc" ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return sortDir === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredQuestions(result);
  }, [
    search,
    topic,
    difficulty,
    sortKey,
    sortDir,
    showCompleted,
    completedQuestions,
  ]);

  // Update search input when URL param changes
  useEffect(() => {
    setInputSearch(search);
  }, [search]);

  // Get current page questions
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  // Generate CSV for download
  const generateCSV = (): void => {
    let csvContent = "Topic,Question,Difficulty,LeetCode Link,Completed\n";

    filteredQuestions.forEach((q) => {
      const questionId = createQuestionId(q);
      const isCompleted = completedQuestions[questionId] ? "Yes" : "No";
      csvContent += `"${q.topic}","${q.question}","${q.difficulty}","${q.link}","${isCompleted}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dsa_questions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate pagination items
  const paginationItems = (): JSX.Element[] => {
    const items: JSX.Element[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  // Calculate topic counts
  const calculateTopicCounts = (): TopicCount => {
    const counts: TopicCount = {};

    // Count all questions by topic
    dsaQuestions.forEach((q) => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });

    return counts;
  };

  const topicCounts = calculateTopicCounts();

  // Calculate difficulty counts
  const calculateDifficultyCounts = (): DifficultyCount => {
    const counts: DifficultyCount = { Easy: 0, Medium: 0, Hard: 0 };

    dsaQuestions.forEach((q) => {
      counts[q.difficulty]++;
    });

    return counts;
  };

  const difficultyCounts = calculateDifficultyCounts();

  // Calculate completed counts
  const calculateCompletedCounts = (): CompletionCount => {
    if (!isClient)
      return { completed: 0, total: dsaQuestions.length, percentage: 0 };

    const completed = Object.values(completedQuestions).filter(Boolean).length;
    return {
      completed,
      total: dsaQuestions.length,
      percentage: Math.round((completed / dsaQuestions.length) * 100),
    };
  };

  const completedCounts = calculateCompletedCounts();

  // Calculate topic-wise completion
  const calculateTopicCompletion = (): TopicCompletion => {
    if (!isClient) return {};

    const topicCompletion: TopicCompletion = {};

    topics.forEach((topicName) => {
      const topicQuestions = dsaQuestions.filter((q) => q.topic === topicName);
      const completedTopicQuestions = topicQuestions.filter(
        (q) => completedQuestions[createQuestionId(q)]
      );

      topicCompletion[topicName] = {
        completed: completedTopicQuestions.length,
        total: topicQuestions.length,
        percentage: Math.round(
          (completedTopicQuestions.length / topicQuestions.length) * 100
        ),
      };
    });

    return topicCompletion;
  };

  const topicCompletion = calculateTopicCompletion();

  // Calculate difficulty-wise completion
  const calculateDifficultyCompletion = (): DifficultyCompletion => {
    if (!isClient)
      return {
        Easy: { completed: 0, total: 0, percentage: 0 },
        Medium: { completed: 0, total: 0, percentage: 0 },
        Hard: { completed: 0, total: 0, percentage: 0 },
      };

    const difficultyCompletion: DifficultyCompletion = {
      Easy: { completed: 0, total: 0, percentage: 0 },
      Medium: { completed: 0, total: 0, percentage: 0 },
      Hard: { completed: 0, total: 0, percentage: 0 },
    };

    Object.keys(difficultyCompletion).forEach((difficultyLevel) => {
      const typedDifficulty = difficultyLevel as "Easy" | "Medium" | "Hard";
      const difficultyQuestions = dsaQuestions.filter(
        (q) => q.difficulty === typedDifficulty
      );
      const completedDifficultyQuestions = difficultyQuestions.filter(
        (q) => completedQuestions[createQuestionId(q)]
      );

      difficultyCompletion[typedDifficulty] = {
        completed: completedDifficultyQuestions.length,
        total: difficultyQuestions.length,
        percentage:
          difficultyQuestions.length > 0
            ? Math.round(
                (completedDifficultyQuestions.length /
                  difficultyQuestions.length) *
                  100
              )
            : 0,
      };
    });

    return difficultyCompletion;
  };

  const difficultyCompletion = calculateDifficultyCompletion();

  return (
    <div className="container mx-auto max-w-7xl py-4 sm:py-8 px-2 sm:px-4">
      <h1 className="text-xl font-bold mb-4 sm:mb-6">Practice DSA Questions</h1>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="mb-4 sm:mb-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList className="grid w-full sm:w-fit grid-cols-2">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Questions</span>
              <span className="sm:hidden">Q</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
              <span className="sm:hidden">P</span>
            </TabsTrigger>
          </TabsList>

          {isClient && (
            <div className="bg-card p-2 rounded-lg border shadow-sm w-full sm:w-auto">
              <div className="flex flex-row text-sm justify-between items-center gap-2 sm:gap-4">
                <h2 className="font-medium">Completed</h2>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>
                    {completedCounts.completed} of {completedCounts.total} (
                    {completedCounts.percentage}%)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <TabsContent value="questions">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-8 w-full"
                value={inputSearch}
                onChange={handleSearchChange}
              />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>

            <div className="flex gap-2 sm:gap-4">
              <Select value={difficulty} onValueChange={handleDifficultyChange}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">
                    Easy ({difficultyCounts.Easy})
                  </SelectItem>
                  <SelectItem value="Medium">
                    Medium ({difficultyCounts.Medium})
                  </SelectItem>
                  <SelectItem value="Hard">
                    Hard ({difficultyCounts.Hard})
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={showCompleted}
                onValueChange={handleCompletedChange}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Questions</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4 sm:mb-6 flex flex-wrap gap-2">
            <div className="bg-primary/10 text-primary rounded-md px-3 py-1 text-xs font-semibold">
              Total: {dsaQuestions.length}
            </div>
            {Object.entries(topicCounts).map(([topicName, count]) => (
              <div
                key={topicName}
                className={`rounded-md flex items-center justify-center px-3 text-xs py-1 font-medium cursor-pointer ${
                  topic === topicName
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() =>
                  handleTopicChange(topic === topicName ? "all" : topicName)
                }
              >
                {topicName}: {count}
              </div>
            ))}
          </div>

          <div className="flex mb-4 sm:mb-6 w-full items-start gap-3">
            <div className="border rounded-md w-full min-h-[450px] overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <span className="sr-only">Status</span>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("topic")}
                    >
                      Topic
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("question")}
                    >
                      Question
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("difficulty")}
                    >
                      Difficulty
                    </TableHead>
                    <TableHead>
                      <span className="hidden sm:inline">Code Link</span>
                      <span className="sm:hidden">Link</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentQuestions.length > 0 ? (
                    currentQuestions.map((question, index) => {
                      const questionId = createQuestionId(question);
                      const isCompleted = completedQuestions[questionId];

                      return (
                        <TableRow
                          key={index}
                          className={
                            isCompleted ? "bg-green-950/20 h-12" : "h-12"
                          }
                        >
                          <TableCell>
                            <Checkbox
                              checked={isCompleted}
                              onCheckedChange={() =>
                                toggleCompleted(questionId)
                              }
                              className={
                                isCompleted
                                  ? "text-green-500 border-green-500"
                                  : ""
                              }
                            />
                          </TableCell>
                          <TableCell className="font-medium whitespace-nowrap">
                            {question.topic}
                          </TableCell>
                          <TableCell className="max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
                            {question.question}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                question.difficulty === "Easy"
                                  ? "bg-green-950/20 text-green-500 border-green-500"
                                  : question.difficulty === "Medium"
                                  ? "bg-yellow-950/20 text-yellow-500 border-yellow-500"
                                  : "bg-red-950/20 text-red-500 border-red-500"
                              }
                            >
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {question.link !== "Link not provided" ? (
                              <a
                                href={question.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                <span className="hidden sm:inline">
                                  View Problem
                                </span>
                                <span className="sm:hidden">View</span>
                              </a>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No questions found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center text-sm text-muted-foreground order-2 sm:order-1">
              Showing{" "}
              {filteredQuestions.length > 0
                ? (currentPage - 1) * questionsPerPage + 1
                : 0}{" "}
              to{" "}
              {Math.min(
                currentPage * questionsPerPage,
                filteredQuestions.length
              )}{" "}
              of {filteredQuestions.length} questions
            </div>

            <div className="order-1 sm:order-2 w-full sm:w-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {paginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={generateCSV}
              className="flex items-center gap-2 order-3 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export to CSV</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          {isClient ? (
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Completion Summary</CardTitle>
                  <CardDescription>
                    Quick overview of your progress
                  </CardDescription>
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
                  <CardDescription>
                    Your progress across different difficulty levels
                  </CardDescription>
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
                  <CardDescription>
                    Your progress across different DSA topics
                  </CardDescription>
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
          ) : (
            <div className="flex justify-center items-center p-8 sm:p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  Loading your progress...
                </h3>
                <p className="text-muted-foreground">
                  Please wait while we load your progress data.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
