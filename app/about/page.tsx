import SkillCard from "@/components/SkillCard";

export const metadata = {
  title: 'About Me',
};

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 flex-1 flex flex-col">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">
              I am a Chemistry graduate and aspiring full-stack developer
              interested in programming, data science, and scientific apps and programs.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <SkillCard
              title="Programming"
              skills={["JavaScript", "Python", "C++", "Java", "React", "Next.js", "Node.js", "Express", "MongoDB", "SQL"]}
              />
              
              <SkillCard
              title="Chemistry"
              skills={["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Computational Chemistry", "Machine Learning", "Scikit-learn"]}
            />
          </div>
        </main>
      );
    }