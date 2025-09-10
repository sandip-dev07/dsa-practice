import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo, useCallback, useMemo } from "react";
import type {
  TopicCount,
  DifficultyCount,
  CompletedFilter,
} from "@/types/question-types";
import type { SheetType } from "@/data/questions";
import { sheetOptions } from "@/data/questions";

interface FiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedSheet: SheetType;
  onSheetChange: (value: SheetType) => void;
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

const FiltersComponent: React.FC<FiltersProps> = ({
  search,
  onSearchChange,
  onSearchSubmit,
  selectedSheet,
  onSheetChange,
  topic,
  onTopicChange,
  difficulty,
  onDifficultyChange,
  showCompleted,
  onCompletedChange,
  topics,
  topicCounts,
  difficultyCounts,
}) => {
  // Memoized event handlers to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e);
  }, [onSearchChange]);

  const handleSearchSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    onSearchSubmit(e);
  }, [onSearchSubmit]);

  const handleTopicChange = useCallback((value: string) => {
    onTopicChange(value);
  }, [onTopicChange]);

  const handleDifficultyChange = useCallback((value: string) => {
    onDifficultyChange(value);
  }, [onDifficultyChange]);

  const handleCompletedChange = useCallback((value: CompletedFilter) => {
    onCompletedChange(value);
  }, [onCompletedChange]);

  const handleSheetChange = useCallback((value: SheetType) => {
    onSheetChange(value);
  }, [onSheetChange]);

  // Memoized topic options to prevent unnecessary re-renders
  const topicOptions = useMemo(() => (
    topics.map((topicName) => (
      <SelectItem key={topicName} value={topicName}>
        {topicName} ({topicCounts[topicName] || 0})
      </SelectItem>
    ))
  ), [topics, topicCounts]);

  // Memoized difficulty options
  const difficultyOptions = useMemo(() => [
    <SelectItem key="all" value="all">All Difficulties</SelectItem>,
    <SelectItem key="Easy" value="Easy">Easy ({difficultyCounts.Easy || 0})</SelectItem>,
    <SelectItem key="Medium" value="Medium">Medium ({difficultyCounts.Medium || 0})</SelectItem>,
    <SelectItem key="Hard" value="Hard">Hard ({difficultyCounts.Hard || 0})</SelectItem>,
  ], [difficultyCounts]);

  // Memoized status options
  const statusOptions = useMemo(() => [
    <SelectItem key="all" value="all">All Questions</SelectItem>,
    <SelectItem key="completed" value="completed">Completed</SelectItem>,
    <SelectItem key="pending" value="pending">Pending</SelectItem>,
  ], []);

  // Memoized sheet options
  const sheetSelectOptions = useMemo(() => (
    sheetOptions.map((sheet) => (
      <SelectItem key={sheet.value} value={sheet.value}>
        {sheet.label}
      </SelectItem>
    ))
  ), []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions..."
          className="pl-8 w-full"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Select value={selectedSheet} onValueChange={handleSheetChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sheet" />
          </SelectTrigger>
          <SelectContent>
            {sheetSelectOptions}
          </SelectContent>
        </Select>

        <div className="w-full">
          <Select value={topic} onValueChange={handleTopicChange}>
            <SelectTrigger>
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topicOptions}
            </SelectContent>
          </Select>
        </div>

        <Select value={difficulty} onValueChange={handleDifficultyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions}
          </SelectContent>
        </Select>

        <Select value={showCompleted} onValueChange={handleCompletedChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

FiltersComponent.displayName = "FiltersComponent";

export const Filters = memo(FiltersComponent);
