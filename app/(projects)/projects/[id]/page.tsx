import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <h1 className="text-3xl font-bold">{project.title}</h1>

      <p className="mt-4 text-gray-700">{project.description}</p>

      <p className="mt-4 text-sm text-gray-500">
        Completed in {project.yearCompleted}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span key={technology} className="rounded-full bg-gray-100 px-3 py-1">
            {technology}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-blue-700 hover:underline"
        >
          View project
        </a>
      )}
    </article>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <main className="container mx-auto px-4 py-12">
      <Suspense fallback={<p>Loading project...</p>}>
        <ProjectContent params={params} />
      </Suspense>
    </main>
  );
}