import type { DSAQuestion, TopicCount, DifficultyCount, CompletionCount, TopicCompletion, DifficultyCompletion, CompletedFilter } from "@/types/question-types";

export const createQuestionId = (question: DSAQuestion): string => {
  // Validate input - question and link are required for uniqueness
  if (!question.question || !question.link) {
    throw new Error("Invalid question data: missing required fields (question or link)");
  }

  // Create ID based on question content and link, NOT topic/difficulty
  // This ensures that the same question across different topics/sheets has the same ID
  const questionSlug = question.question.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_") // Replace multiple underscores with single
    .replace(/^_|_$/g, ""); // Remove leading/trailing underscores

  // Include link domain and path to make it unique and consistent across sheets
  const urlSlug = question.link
    .replace(/^https?:\/\//, "") // Remove protocol
    .replace(/\/$/, "") // Remove trailing slash
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const id = `${questionSlug}_${urlSlug}`;

  // Validate the generated ID
  if (id.length === 0 || id.length > 500) {
    throw new Error(`Generated question ID is invalid: ${id}`);
  }

  return id;
};

// Validation function for completed questions map
export const validateCompletedQuestions = (
  completedQuestions: Record<string, boolean>,
  questions: DSAQuestion[]
): Record<string, boolean> => {
  const validQuestionIds = new Set(questions.map(q => createQuestionId(q)));
  const validated: Record<string, boolean> = {};

  Object.entries(completedQuestions).forEach(([questionId, solved]) => {
    // Only include questions that exist in the current sheet
    if (validQuestionIds.has(questionId) && typeof solved === 'boolean') {
      validated[questionId] = solved;
    }
  });

  return validated;
};

// Helper function to get question content hash for duplicate detection
export const getQuestionContentHash = (question: DSAQuestion): string => {
  return `${question.question.trim().toLowerCase()}|${question.link.trim().toLowerCase()}`;
};

// Function to find duplicate questions across sheets/topics
export const findDuplicateQuestions = (questions: DSAQuestion[]): Map<string, DSAQuestion[]> => {
  const questionMap = new Map<string, DSAQuestion[]>();

  questions.forEach(question => {
    const hash = getQuestionContentHash(question);
    if (!questionMap.has(hash)) {
      questionMap.set(hash, []);
    }
    questionMap.get(hash)!.push(question);
  });

  // Filter to only include actual duplicates (more than one occurrence)
  const duplicates = new Map<string, DSAQuestion[]>();
  questionMap.forEach((questions, hash) => {
    if (questions.length > 1) {
      duplicates.set(hash, questions);
    }
  });

  return duplicates;
};

// Debug function to analyze progress data
export const debugProgressData = (
  progress: any[],
  questions: DSAQuestion[]
) => {
  console.log("=== PROGRESS DEBUG INFO ===");
  console.log(`Total progress entries: ${progress.length}`);

  const questionIdCounts = new Map<string, number>();
  progress.forEach(item => {
    questionIdCounts.set(item.questionId, (questionIdCounts.get(item.questionId) || 0) + 1);
  });

  const duplicates = Array.from(questionIdCounts.entries()).filter(([, count]) => count > 1);
  console.log(`Duplicate question IDs: ${duplicates.length}`);

  if (duplicates.length > 0) {
    console.log("Duplicate entries:");
    duplicates.forEach(([questionId, count]) => {
      console.log(`  ${questionId}: ${count} entries`);
    });
  }

  const completedCount = progress.filter(p => p.solved).length;
  console.log(`Completed questions: ${completedCount}`);

  const validQuestionIds = new Set(questions.map(q => createQuestionId(q)));
  const validProgress = progress.filter(p => validQuestionIds.has(p.questionId));
  console.log(`Valid progress entries: ${validProgress.length}`);

  console.log("=== END DEBUG INFO ===");
};

// Function to analyze and report duplicate questions across sheets/topics
export const analyzeQuestionDuplicates = (allSheets: Record<string, DSAQuestion[]>) => {
  console.log("=== QUESTION DUPLICATES ANALYSIS ===");

  // Collect all questions across all sheets
  const allQuestions: DSAQuestion[] = [];
  Object.entries(allSheets).forEach(([sheetName, questions]) => {
    allQuestions.push(...questions);
  });

  // Find duplicates
  const duplicates = findDuplicateQuestions(allQuestions);

  console.log(`Total questions across all sheets: ${allQuestions.length}`);
  console.log(`Unique question content: ${new Set(allQuestions.map(q => getQuestionContentHash(q))).size}`);
  console.log(`Duplicate question groups: ${duplicates.size}`);

  if (duplicates.size > 0) {
    console.log("\n=== DUPLICATE QUESTIONS FOUND ===");
    let count = 1;
    duplicates.forEach((questions, hash) => {
      const [questionText, link] = hash.split('|');
      console.log(`\n${count}. "${questionText}"`);
      console.log(`   Link: ${link}`);
      console.log(`   Appears in:`);

      const appearances = new Map<string, DSAQuestion[]>();
      questions.forEach(q => {
        const key = `${q.sheet || 'unknown'} - ${q.topic}`;
        if (!appearances.has(key)) {
          appearances.set(key, []);
        }
        appearances.get(key)!.push(q);
      });

      appearances.forEach((sheetQuestions, location) => {
        console.log(`     - ${location} (${sheetQuestions.length} times)`);
        sheetQuestions.forEach(q => {
          console.log(`       ID: ${q.id || 'generated'}`);
        });
      });

      count++;
    });
  } else {
    console.log("No duplicate questions found across sheets/topics.");
  }

  console.log("\n=== END ANALYSIS ===");
  return duplicates;
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
  // Filter out false values and count only truly completed questions
  const completed = Object.values(completedQuestions).filter(Boolean).length;

  // Ensure we don't exceed total questions
  const validCompleted = Math.min(completed, totalQuestions);

  // Handle edge case where totalQuestions is 0
  const percentage = totalQuestions > 0 ? Math.round((validCompleted / totalQuestions) * 100) : 0;

  return {
    completed: validCompleted,
    total: totalQuestions,
    percentage,
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

    if (topicQuestions.length === 0) {
      topicCompletion[topicName] = {
        completed: 0,
        total: 0,
        percentage: 0,
      };
      return;
    }

    const completedTopicQuestions = topicQuestions.filter(
      (q) => completedQuestions[createQuestionId(q)]
    );

    // Ensure we don't exceed the total number of questions
    const validCompleted = Math.min(completedTopicQuestions.length, topicQuestions.length);

    topicCompletion[topicName] = {
      completed: validCompleted,
      total: topicQuestions.length,
      percentage: Math.round((validCompleted / topicQuestions.length) * 100),
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

    if (difficultyQuestions.length === 0) {
      return;
    }

    const completedDifficultyQuestions = difficultyQuestions.filter(
      (q) => completedQuestions[createQuestionId(q)]
    );

    // Ensure we don't exceed the total number of questions
    const validCompleted = Math.min(completedDifficultyQuestions.length, difficultyQuestions.length);

    difficultyCompletion[typedDifficulty] = {
      completed: validCompleted,
      total: difficultyQuestions.length,
      percentage: Math.round((validCompleted / difficultyQuestions.length) * 100),
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
    showCompleted: CompletedFilter;
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
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      // Handle undefined/null values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDir === "asc" ? -1 : 1;
      if (bValue == null) return sortDir === "asc" ? 1 : -1;

      if (aValue < bValue) {
        return sortDir === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDir === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  return result;
}; 