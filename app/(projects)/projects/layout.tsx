import ProjectsNav from "@/components/ProjectsNav";
import { Suspense } from "react";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
      <Suspense
        fallback={
          <div
            className="mb-8 h-12 border-b border-gray-200"
            aria-label="Loading navigation"
          />
        }
      >
        <ProjectsNav />
      </Suspense>
      
      {children}
    </section>
  );
}
