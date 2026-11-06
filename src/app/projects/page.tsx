import type { Metadata } from "next";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Portfolio"
      title="Projects"
      description="Apps and tools I've built. Click through to try the live versions or read the code."
      className="pt-36"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.slug} id={project.slug} className="scroll-mt-24">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
}
