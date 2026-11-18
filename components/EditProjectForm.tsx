"use client";

import { useActionState } from "react";
import Link from "next/link";
import { initialProjectState } from "@/lib/project-form-state";
import { updateProject } from "@/lib/actions";

interface EditProjectFormProps {
  project: Project;
  currentYear: number;
}

export default function EditProjectForm({
  project,
  currentYear,
}: EditProjectFormProps) {
  const updateProjectWithId = updateProject.bind(null, project.id);

  const [state, formAction, isPending] = useActionState(
    updateProjectWithId,
    initialProjectState,
  );
  return (
    <form
      action={formAction}
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
          defaultValue={state.values?.title ?? project.title}
          aria-describedby="title-error"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 
            focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-blue-600
  user-invalid:border-red-500
  user-invalid:focus-visible:outline-red-500"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
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
          defaultValue={state.values?.type ?? project.type}
          aria-describedby="type-error"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
            focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-blue-600
  user-invalid:border-red-500
  user-invalid:focus-visible:outline-red-500"
        >
          <option value="opensource">Open Source</option>
          <option value="school">School Project</option>
        </select>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Year Completed */}
      <div>
        <label
          htmlFor="yearCompleted"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Year Completed
        </label>

        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          required
          min={2000}
          max={currentYear}
          step={1}
          defaultValue={state.values?.yearCompleted ?? project.yearCompleted}
          aria-describedby="yearCompleted-error"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 
    focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-blue-600
  user-invalid:border-red-500
  user-invalid:focus-visible:outline-red-500"
        />

        <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
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
          defaultValue={state.values?.description ?? project.description}
          aria-describedby="description-error"
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 
            focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-blue-600
  user-invalid:border-red-500
  user-invalid:focus-visible:outline-red-500"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
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
          minLength={2}
          defaultValue={state.values?.technologies ?? project.technologies.join(", ")}
          aria-describedby="technologies-help technologies-error"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 
           focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-blue-600
  user-invalid:border-red-500
  user-invalid:focus-visible:outline-red-500"
        />

        <p id="technologies-help" className="mt-1 text-xs text-gray-500">
          Separate technologies with commas.
        </p>

        <div id="technologies-error" aria-live="polite" aria-atomic="true">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Project link */}
      <div>
        <label
          htmlFor="link"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Project Link (Optional)
        </label>

        <input
          id="link"
          name="link"
          type="url"
          defaultValue={state.values?.link ?? project.link ?? ""}
          placeholder="https://github.com/username/project"
          aria-describedby="link-error"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 
            focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-blue-600
  user-invalid:border-red-500
  user-invalid:focus-visible:outline-red-500"
        />
        <div id="link-error" aria-live="polite" aria-atomic="true">
          {state.errors?.link?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-red-600"
        >
          {state.message}
        </p>
      )}

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
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Updating..." : "Update Project"}
        </button>
      </div>
    </form>
  );
}
