import ProjectsNav from "@/components/ProjectsNav";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
            <ProjectsNav />
            {children}
        </section>
    );
}