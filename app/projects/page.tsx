import ProjectList from "@/components/ProjectList";
import { Suspense } from "react";

export const metadata = {
  title: 'Projects',
};

async function ProjectsContent() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const projects = await response.json();
    return <ProjectList projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">
        Projects Overview
      </h1>
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectsContent />
          </Suspense>
    </main>
  );
}