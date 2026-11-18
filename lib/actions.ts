"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProjectFormSchema } from "./validations";

export type ProjectFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    yearCompleted?: string[];
    link?: string[];
  };
  message?: string | null;
  values?: {
    title?: string;
    description?: string;
    type?: string;
    technologies?: string;
    yearCompleted?: string;
    link?: string;
  };
};

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    yearCompleted: formData.get("yearCompleted"),
    type: formData.get("type"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct any remaining errors.",
      values: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      type: String(formData.get("type") ?? ""),
      technologies: String(formData.get("technologies") ?? ""),
      yearCompleted: String(formData.get("yearCompleted") ?? ""),
        link: String(formData.get("link") ?? ""),
      },
    };
  }

  const {
    title,
    description,
    type,
    technologies: technologiesInput,
    yearCompleted,
    link,
  } = validatedFields.data;

  const technologies = technologiesInput
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  if (technologies.length === 0) {
    return {
      errors: {
        technologies: ["At least one technology is required."],
      },
      message: "Please correct any remaining errors.",
    };
  }

  try {
    await sql.query(
      `INSERT INTO projects (
      title,
      description,
      type,
      technologies,
      year_completed,
      link
    )
    VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, description, type, technologies, yearCompleted, link || null],
    );
  } catch {
    return {
      message: "Database Error: Failed to create project.",
    };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(
  id: number,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  if (!Number.isInteger(id) || id <= 0) {
    return { message: "Invalid project ID." };
  }

  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    yearCompleted: formData.get("yearCompleted"),
    type: formData.get("type"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct any remaining errors.",
      values: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      type: String(formData.get("type") ?? ""),
      technologies: String(formData.get("technologies") ?? ""),
      yearCompleted: String(formData.get("yearCompleted") ?? ""),
      link: String(formData.get("link") ?? ""),
    },
    };
  }

  const {
    title,
    description,
    type,
    technologies: technologiesInput,
    yearCompleted,
    link,
  } = validatedFields.data;

  const technologies = technologiesInput
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  if (technologies.length === 0) {
    return {
      errors: {
        technologies: ["At least one technology is required."],
      },
      message: "Please correct any remaining errors.",
    };
  }
  let result;
  try {
    result = await sql.query(
      `UPDATE projects
     SET
       title = $1,
       description = $2,
       type = $3,
       technologies = $4,
       year_completed = $5,
       link = $6
     WHERE id = $7`,
      [title, description, type, technologies, yearCompleted, link || null, id],
    );
  } catch {
    return {
      message: "Database Error: Failed to update project.",
    };
  }

  if (result.rowCount === 0) {
    return { message: "Project not found." };
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}/edit`);
  

  redirect("/projects");
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  const result = await sql.query("DELETE FROM projects WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    throw new Error("Project not found.");
  }

  revalidatePath("/projects");
  redirect("/projects");
}
