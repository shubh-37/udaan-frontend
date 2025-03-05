// components/ui/pagination.jsx
import { Button } from "@/components/ui/button";

export function Pagination({
  currentPage,
  totalItems,
  rowsPerPage,
  onPageChange,
  className = "",
}) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    const items = [];

    // Show all pages if total pages are 7 or less
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            variant={currentPage === i ? "default" : "ghost"}
            className="h-8 w-8"
          >
            {i}
          </Button>
        );
      }
      return items;
    }

    // Always add first page
    items.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        variant={currentPage === 1 ? "default" : "ghost"}
        className="h-8 w-8"
      >
        1
      </Button>
    );

    // Add left ellipsis if needed
    if (currentPage > 4) {
      items.push(
        <span key="left-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === currentPage - 1 || i === currentPage || i === currentPage + 1) {
        items.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            variant={currentPage === i ? "default" : "ghost"}
            className="h-8 w-8"
          >
            {i}
          </Button>
        );
      }
    }

    // Add right ellipsis if needed
    if (currentPage < totalPages - 3) {
      items.push(
        <span key="right-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    // Always add last page
    if (totalPages > 1) {
      items.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          variant={currentPage === totalPages ? "default" : "ghost"}
          className="h-8 w-8"
        >
          {totalPages}
        </Button>
      );
    }

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-2 m-4 p-6 w-full mx-auto ${className}`}>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        className="h-8 w-8"
      >
        ←
      </Button>

      {renderPaginationItems()}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="ghost"
        className="h-8 w-8"
      >
        →
      </Button>
    </div>
  );
}