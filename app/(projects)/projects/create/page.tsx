import Link from "next/link";
import CreateProjectForm from "@/components/CreateProjectForm";
import { connection } from "next/server";

export const instant = false;

export const metadata = {
  title: "Create Project",
};

export default async function CreateProjectPage() {
  await connection();
  const currentYear = new Date().getFullYear();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Projects
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Create a New Project
        </h1>

        <p className="mt-2 text-gray-600">
          Add a new project to your portfolio.
        </p>
      </div>

      <CreateProjectForm currentYear={currentYear} />
    </main>
  );
}
