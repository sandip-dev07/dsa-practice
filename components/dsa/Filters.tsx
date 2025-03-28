import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  TopicCount,
  DifficultyCount,
  CompletedFilter,
} from "@/types/question-types";

interface FiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  topic: string;
  onTopicChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  showCompleted: CompletedFilter;
  onCompletedChange: (value: CompletedFilter) => void;
  topics: string[];
  topicCounts: TopicCount;
  difficultyCounts: DifficultyCount;
}

export function Filters({
  search,
  onSearchChange,
  onSearchSubmit,
  topic,
  onTopicChange,
  difficulty,
  onDifficultyChange,
  showCompleted,
  onCompletedChange,
  topics,
  topicCounts,
  difficultyCounts,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
      <form onSubmit={onSearchSubmit} className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions..."
          className="pl-8 w-full"
          value={search}
          onChange={onSearchChange}
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      <div className="grid grid-cols-3 gap-2">
        <div className="w-full">
          <Select value={topic} onValueChange={onTopicChange}>
            <SelectTrigger>
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((topicName) => (
                <SelectItem key={topicName} value={topicName}>
                  {topicName} ({topicCounts[topicName]})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy ({difficultyCounts.Easy})</SelectItem>
            <SelectItem value="Medium">
              Medium ({difficultyCounts.Medium})
            </SelectItem>
            <SelectItem value="Hard">Hard ({difficultyCounts.Hard})</SelectItem>
          </SelectContent>
        </Select>

        <Select value={showCompleted} onValueChange={onCompletedChange}>
          <SelectTrigger>
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
  );
}
