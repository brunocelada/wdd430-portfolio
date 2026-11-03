import { Project } from "@/lib/projects-db";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-700 mb-3">
        {project.description}
      </p>
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

      <Link
        href={project.link ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        View project
      </Link>
    </article>
  );
}