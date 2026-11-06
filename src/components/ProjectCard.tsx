import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft-lg">
      <div className="relative aspect-[8/5] w-full overflow-hidden border-b border-border bg-background">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface-hover px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-4 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-bright hover:underline"
            >
              View live <ArrowUpRight size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
            >
              <GithubIcon size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
