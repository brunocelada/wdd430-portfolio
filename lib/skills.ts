export interface SkillCategory {
  subject: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    subject: "Programming",
    skills: [
      "JavaScript", "Python", "C++",
      "Java", "React", "Next.js",
      "Node.js", "Express", "MongoDB",
      "SQL",
    ],
  },
  {
    subject: "Chemistry",
    skills: [
      "Organic Chemistry", "Inorganic Chemistry",
      "Physical Chemistry", "Computational Chemistry",
      "Machine Learning", "Scikit-learn",
    ],
  },
];