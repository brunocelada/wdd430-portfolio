import { sql } from "@vercel/postgres";

const ITEMS_PER_PAGE = 6;

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  yearCompleted: number;
  link?: string;
}

export function sanitizeSearchQuery(query?: string): string {
  return (query ?? "").trim().slice(0, 100);
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT *,
  year_completed AS "yearCompleted"
  FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`SELECT *,
  year_completed AS "yearCompleted"
   FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT *,
  year_completed AS "yearCompleted"
   FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
): Promise<Project[]> {
  const page =
    Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const projects = await sql<Project>`
  SELECT *,
  year_completed AS "yearCompleted"
  
  FROM projects
  WHERE
      title ILIKE ${`%${query}%`}
      OR description ILIKE ${`%${query}%`}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${`%${query}%`}
      )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return projects.rows;
}

export async function fetchProjectsPages(query: string) {
  const result = await sql`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE
      title ILIKE ${`%${query}%`}
      OR description ILIKE ${`%${query}%`}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${`%${query}%`}
      )
  `;
  const count = Number(result.rows[0].count);

  return Math.ceil(count / ITEMS_PER_PAGE);
}
