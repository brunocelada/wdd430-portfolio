import ProjectList from "@/components/ProjectList";
import Pagination from "@/components/Pagination";
import ProjectSearch from "@/components/ProjectSearch";
import { Suspense } from "react";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
  sanitizeSearchQuery,
} from "@/lib/projects-db";

export const metadata = {
  title: "Projects",
};

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
  }>;
}

async function ProjectsContent({
  searchParams,
}: ProjectsPageProps) {
const params = await searchParams;

  const rawQuery = Array.isArray(params.query)
    ? params.query[0]
    : params.query;
  const query = sanitizeSearchQuery(rawQuery);

  const rawPage = Array.isArray(params.page)
    ? params.page[0]
    : params.page;
  const currentPage =
    rawPage && /^\d+$/.test(rawPage) && Number(rawPage) > 0
      ? Number(rawPage)
      : 1;

  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <>
      <ProjectList projects={projects} />
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  return (
    <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">
        Projects Overview
      </h1>

      <Suspense fallback={<div>Loading search...</div>}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
