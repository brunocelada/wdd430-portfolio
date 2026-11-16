import Link from "next/link";
import { createProject } from "@/lib/actions";

export const metadata = {
  title: "Create Project",
};

export default function CreateProjectPage() {
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

      <form
        action={createProject}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Project title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Project Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            placeholder="Enter project title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Project type */}
        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Project Type
          </label>

          <select
            id="type"
            name="type"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled>
              Select a project type
            </option>
            <option value="opensource">Open Source</option>
            <option value="school">School Project</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            required
            minLength={3}
            rows={4}
            placeholder="Describe your project..."
            className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Technologies */}
        <div>
          <label
            htmlFor="technologies"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Technologies
          </label>

          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            placeholder="Next.js, TypeScript, Tailwind CSS"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-xs text-gray-500">
            Separate technologies with commas.
          </p>
        </div>

        {/* Project link */}
        <div>
          <label
            htmlFor="link"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Project Link
            <span className="ml-1 font-normal text-gray-400">(Optional)</span>
          </label>

          <input
            id="link"
            name="link"
            type="url"
            placeholder="https://github.com/username/project"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
          <Link
            href="/projects"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Project
          </button>
        </div>
      </form>
    </main>
  );
}
