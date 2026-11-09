import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const metadata = {
  title: 'Open Source',
};

async function OpenSourceProjectsContent() {
  const projects = await getProjects("opensource");
  return <ProjectList projects={projects} />;
}

export default function OpenSourcePage() {
  return (
    <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">
        Open Source Projects
      </h1>

     <Suspense fallback={<p>Loading open source projects...</p>}>
        <OpenSourceProjectsContent />
      </Suspense>
    </main>
  );
}