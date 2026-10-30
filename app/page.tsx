import ProjectList from "@/components/ProjectList";
const projects = [
  {
    title: "PaperLens",
    description: "A responsive web application designed to discover scientific papers.",
    technologies: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/brunocelada/wdd330-paperLens"
  },
  {
    title: "API UNR Carreers",
    description: "A collection of degree programs from the UNR (National University of Rosario).",
    technologies: ["JavaScript", "CSS", "HTML"],
    link: "https://github.com/brunocelada/cse341-unr"
  }
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I am a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}