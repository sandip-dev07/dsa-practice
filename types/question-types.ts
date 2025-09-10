export interface DSAQuestion {
  topic: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  id?: string; // Optional ID from JSON files
  sheet?: string; // Optional sheet name for analysis
}

export type CompletedQuestionsMap = Record<string, boolean>;

export interface TopicCount {
  [key: string]: number;
}

export interface DifficultyCount {
  Easy: number;
  Medium: number;
  Hard: number;
}

export interface CompletionCount {
  completed: number;
  total: number;
  percentage: number;
}

export interface TopicCompletion {
  [key: string]: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export interface DifficultyCompletion {
  Easy: {
    completed: number;
    total: number;
    percentage: number;
  };
  Medium: {
    completed: number;
    total: number;
    percentage: number;
  };
  Hard: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export type TabValue = "questions" | "progress";
export type CompletedFilter = "all" | "completed" | "pending";
export type SortKey = keyof DSAQuestion;
export type SortDirection = "asc" | "desc";
