import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const metadata = {
  title: 'School Projects',
};

async function SchoolProjectsContent() {
  const projects = await getProjects("school");
  return <ProjectList projects={projects} />;
}

export default function SchoolPage() {
  return (
    <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">
        School Projects
      </h1>

     <Suspense fallback={<p>Loading school projects...</p>}>
        <SchoolProjectsContent />
      </Suspense>
    </main>
  );
}