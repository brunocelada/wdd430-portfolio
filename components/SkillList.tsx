import type { SkillCategory } from "@/lib/skills";

interface SkillListProps {
  category: SkillCategory;
}

export default function SkillList({ category }: SkillListProps) {
  return (
    <section>
      <h2>{category.subject}</h2>

      <ul>
        {category.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}