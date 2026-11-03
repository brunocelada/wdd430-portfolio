export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "PaperLens",
    description: "Scientific literature manager.",
    type: "opensource",
    technologies: ["HTML", "JavaScript", "CSS", "Node.js"],
    link: "https://github.com/brunocelada/wdd330-paperLens",
  },
  {
    id: 2,
    title: "Career UNR API",
    description: "A collection of degree programs from the UNR.",
    type: "school",
    technologies: ["HTML", "JavaScript", "CSS", "Node.js"],
    link: "https://github.com/brunocelada/cse341-unr",
  },
  {
    id: 3,
    title: "Sleep Outside",
    description: "E-commerce application.",
    type: "school",
    technologies: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/brunocelada/wdd330-sleepoutside",
  }
];

export function getProjects(type?: string | null): Project[] {
  if (type) return projects.filter(p => p.type === type);
  return projects;
}

export function getProjectById(id: number): Project | null {
  return projects.find(p => p.id === id) ?? null;
}