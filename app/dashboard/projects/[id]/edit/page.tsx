import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import EditProjectForm from "@/components/EditProjectForm";
import { connection } from "next/server";

export const instant = false;

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Project",
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  await connection();
  const currentYear = new Date().getFullYear();

  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Projects
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">Edit Project</h1>

        <p className="mt-2 text-gray-600">
          Update the information of your project.
        </p>
      </div>

      <EditProjectForm
        key={JSON.stringify(project)}
        project={project}
        currentYear={currentYear} />
    </main>
  );
}
