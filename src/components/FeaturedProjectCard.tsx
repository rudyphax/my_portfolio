import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function FeaturedProjectCard({ project }: { project: Project }) {
  const href = project.liveUrl || project.githubUrl || `/projects#${project.slug}`;
  const external = Boolean(project.liveUrl || project.githubUrl);

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft-lg">
      <div className="relative aspect-[19/6] w-full overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{project.description}</p>
        </div>

        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          aria-label={`View ${project.title}`}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/60 text-foreground transition-colors group-hover:border-accent group-hover:text-accent-bright"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
