import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const metadata = {
  title: 'Home',
};

export const instant = false;

export default async function Home() { 
  // Show only the first 2 projects as featured projects
  const projects = await getProjects();
  const featuredProjects = projects.slice(0, 2);

  return (
    <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I am a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={featuredProjects} />
    </main>
  );
}