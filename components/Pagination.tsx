"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <Link
        href={createPageURL(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        className={`px-4 py-2 rounded ${
          currentPage <= 1
            ? "pointer-events-none opacity-50"
            : "bg-blue-800 text-white"
        }`}
      >
        Previous
      </Link>

      <span className="italic ">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={createPageURL(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded ${
          currentPage >= totalPages
            ? "pointer-events-none opacity-50"
            : "bg-blue-800 text-white"
        }`}
      >
        Next
      </Link>
    </div>
  );
}