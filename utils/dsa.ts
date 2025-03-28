import type { DSAQuestion, TopicCount, DifficultyCount, CompletionCount, TopicCompletion, DifficultyCompletion } from "@/types/question-types";

export const createQuestionId = (question: DSAQuestion): string => {
  return `${question.topic}-${question.question}`.replace(/[^a-zA-Z0-9]/g, "_");
};

export const calculateTopicCounts = (questions: DSAQuestion[]): TopicCount => {
  const counts: TopicCount = {};
  questions.forEach((q) => {
    counts[q.topic] = (counts[q.topic] || 0) + 1;
  });
  return counts;
};

export const calculateDifficultyCounts = (questions: DSAQuestion[]): DifficultyCount => {
  const counts: DifficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  questions.forEach((q) => {
    counts[q.difficulty]++;
  });
  return counts;
};

export const calculateCompletedCounts = (
  completedQuestions: Record<string, boolean>,
  totalQuestions: number
): CompletionCount => {
  const completed = Object.values(completedQuestions).filter(Boolean).length;
  return {
    completed,
    total: totalQuestions,
    percentage: Math.round((completed / totalQuestions) * 100),
  };
};

export const calculateTopicCompletion = (
  questions: DSAQuestion[],
  completedQuestions: Record<string, boolean>,
  topics: string[]
): TopicCompletion => {
  const topicCompletion: TopicCompletion = {};

  topics.forEach((topicName) => {
    const topicQuestions = questions.filter((q) => q.topic === topicName);
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

export const calculateDifficultyCompletion = (
  questions: DSAQuestion[],
  completedQuestions: Record<string, boolean>
): DifficultyCompletion => {
  const difficultyCompletion: DifficultyCompletion = {
    Easy: { completed: 0, total: 0, percentage: 0 },
    Medium: { completed: 0, total: 0, percentage: 0 },
    Hard: { completed: 0, total: 0, percentage: 0 },
  };

  Object.keys(difficultyCompletion).forEach((difficultyLevel) => {
    const typedDifficulty = difficultyLevel as "Easy" | "Medium" | "Hard";
    const difficultyQuestions = questions.filter(
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

type SortKey = keyof DSAQuestion;
type SortDirection = "asc" | "desc";

export const filterQuestions = (
  questions: DSAQuestion[],
  {
    search,
    topic,
    difficulty,
    showCompleted,
    completedQuestions,
    sortKey,
    sortDir,
  }: {
    search: string;
    topic: string;
    difficulty: string;
    showCompleted: string;
    completedQuestions: Record<string, boolean>;
    sortKey: SortKey | "";
    sortDir: SortDirection;
  }
): DSAQuestion[] => {
  let result = questions;

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

  return result;
}; 