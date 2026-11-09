import ProjectList from "@/components/ProjectList";
import { Suspense } from "react";
import { getProjects } from "@/lib/projects-db";

export const metadata = {
  title: 'Projects',
};

async function ProjectsContent() {
    const projects = await getProjects();
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