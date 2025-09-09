import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { memo, useMemo, useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  // Memoized event handlers to prevent recreation on every render
  const handlePrevious = useCallback(() => {
    onPageChange(Math.max(1, currentPage - 1));
  }, [onPageChange, currentPage]);

  const handleNext = useCallback(() => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  }, [onPageChange, totalPages, currentPage]);

  const handlePageClick = useCallback((page: number) => {
    onPageChange(page);
  }, [onPageChange]);

  // Memoized pagination items to prevent recalculation
  const paginationItems = useMemo(() => {
    const items: JSX.Element[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageClick(i)}
              className={`transition-all duration-200 ${
                currentPage === i
                  ? "bg-zinc-600 text-white shadow-md"
                  : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageClick(1)}
            className={`transition-all duration-200 ${
              currentPage === 1
                ? "bg-zinc-600 text-white shadow-md"
                : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageClick(i)}
              className={`transition-all duration-200 ${
                currentPage === i
                  ? "bg-zinc-600 text-white shadow-md"
                  : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={`transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-zinc-600 text-white shadow-md"
                : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }, [totalPages, currentPage, handlePageClick]);

  // Memoized item range display
  const itemRangeDisplay = useMemo(() => {
    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return `${startItem} to ${endItem} of ${totalItems}`;
  }, [currentPage, itemsPerPage, totalItems]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 font-medium order-2 sm:order-1 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 rounded-lg">
        Showing {itemRangeDisplay} questions
      </div>

      <div className="order-1 sm:order-2 w-full sm:w-auto">
        <PaginationRoot className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2 shadow-sm">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className={`transition-all duration-200 ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                }`}
              />
            </PaginationItem>

            {paginationItems}

            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className={`transition-all duration-200 ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationRoot>
      </div>
    </div>
  );
};

PaginationComponent.displayName = "PaginationComponent";

export const Pagination = memo(PaginationComponent); 