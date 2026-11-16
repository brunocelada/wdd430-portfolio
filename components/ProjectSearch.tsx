"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search projects..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(event) => handleSearch(event.target.value)}
      className="w-full rounded-md border border-gray-300 mb-4 px-4 py-2
      outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-300 transition"
    />
  );
}
