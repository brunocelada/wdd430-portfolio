import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";

export const metadata = {
  title: 'School Projects',
};

async function SchoolProjectsContent() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?type=school`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch school projects");
  }

  const projects = await response.json();

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