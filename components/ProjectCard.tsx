import { Project } from "@/lib/projects-db";
import Link from "next/link";
import DeleteProjectButton from "@/components/DeleteProjectButton";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>

      <p className="mt-1 my-2 italic text-sm text-gray-700">
        Completed in {project.yearCompleted}
      </p>

      <p className="text-gray-700 mb-3">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <strong>Technologies:</strong>
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full px-3 py-1 text-sm italic text-gray-600"
          >
            {technology}
          </span>
        ))}
      </div>

      {project.link ? (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-800 hover:underline"
        >
          View project
        </Link>
      ) : (
        <span className="mt-2 inline-block italic text-gray-500">No link</span>
      )}

      {/* UPDATE or DELETE project */}
      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/projects/${project.id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Update
        </Link>

        <DeleteProjectButton projectId={project.id} />
      </div>
    </article>
  );
}
