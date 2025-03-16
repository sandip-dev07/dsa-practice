export interface DSAQuestion {
  topic: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
}

export interface CompletedQuestionsMap {
  [questionId: string]: boolean;
}

export interface TopicCount {
  [topic: string]: number;
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
  [topic: string]: CompletionCount;
}

export interface DifficultyCompletion {
  Easy: CompletionCount;
  Medium: CompletionCount;
  Hard: CompletionCount;
}
