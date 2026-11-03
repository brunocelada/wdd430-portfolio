import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";

export const metadata = {
  title: 'Open Source',
};

async function OpenSourceProjectsContent() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?type=opensource`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch open source projects");
  }

  const projects = await response.json();

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