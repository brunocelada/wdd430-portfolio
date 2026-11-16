"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProjectFormSchema } from "./validations";
import { format } from "path";

export async function createProject(formData: FormData) {
  const validateFields = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    link: formData.get("link"),
  });

  if (!validateFields.success) {
    console.error(validateFields.error.flatten().fieldErrors);
    throw new Error("Invalid project data.");
  }

  const {
    title,
    description,
    technologies: technologiesInput,
    link,
  } = validateFields.data;

  const type = formData.get("type");

  if (type !== "opensource" && type !== "school") {
    throw new Error("Invalid project type.");
  }

  const technologies = technologiesInput
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  if (technologies.length === 0) {
    throw new Error("At least one technology is required.");
  }

  await sql.query(
    `INSERT INTO projects (
      title,
      description,
      type,
      technologies,
      link
    )
    VALUES ($1, $2, $3, $4, $5)`,
    [title, description, type, technologies, link || null],
  );

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(id: number, formData: FormData) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    throw new Error("Invalid project data.");
  }

  const {
    title,
    description,
    technologies: technologiesInput,
    link,
  } = validatedFields.data;

  const type = formData.get("type");

  if (type !== "opensource" && type !== "school") {
    throw new Error("Invalid project type.");
  }

  const technologies = technologiesInput
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  if (technologies.length === 0) {
    throw new Error("At least one technology is required.");
  }

  const result = await sql.query(
    `UPDATE projects
     SET
       title = $1,
       description = $2,
       type = $3,
       technologies = $4,
       link = $5
     WHERE id = $6`,
    [title, description, type, technologies, link || null, id],
  );

  if (result.rowCount === 0) {
    throw new Error("Project not found.");
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);

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
