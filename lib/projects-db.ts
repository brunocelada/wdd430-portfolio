import { sql } from "@vercel/postgres";

const ITEMS_PER_PAGE = 6;

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export function sanitizeSearchQuery(query?: string): string {
  return (query ?? "").trim().slice(0, 100);
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
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
  SELECT *
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

// export const projects: Project[] = [
//   {
//     id: 1,
//     title: "PaperLens",
//     description: "Scientific literature manager.",
//     type: "opensource",
//     technologies: ["HTML", "JavaScript", "CSS", "Node.js"],
//     link: "https://github.com/brunocelada/wdd330-paperLens",
//   },
//   {
//     id: 2,
//     title: "Career UNR API",
//     description: "A collection of degree programs from the UNR.",
//     type: "school",
//     technologies: ["HTML", "JavaScript", "CSS", "Node.js"],
//     link: "https://github.com/brunocelada/cse341-unr",
//   },
//   {
//     id: 3,
//     title: "Sleep Outside",
//     description: "E-commerce application.",
//     type: "school",
//     technologies: ["JavaScript", "HTML", "CSS"],
//     link: "https://github.com/brunocelada/wdd330-sleepoutside",
//   }
// ];

// export function getProjects(type?: string | null): Project[] {
//   if (type) return projects.filter(p => p.type === type);
//   return projects;
// }

// export function getProjectById(id: number): Project | null {
//   return projects.find(p => p.id === id) ?? null;
// }
