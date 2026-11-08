import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Code2,
  Layers,
  Sparkles,
  Cloud,
  Mail,
} from "lucide-react";
import Section from "@/components/Section";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const highlightIcons = [Code2, Layers, Sparkles, Cloud];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[640px] items-center overflow-hidden border-b border-border sm:min-h-[720px] lg:min-h-[800px]">
        <Image
          src={profile.heroPhoto}
          alt={profile.name}
          fill
          priority
          className="object-cover object-[76%_center] sm:object-[80%_center] lg:object-[70%_center]"
          sizes="100vw"
        />
        {/* Dark wash behind the text; stronger on mobile where text sits directly over his face, lighter on desktop where he's positioned clear of it. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_srgb,var(--background)_68%,transparent)_38%,color-mix(in_srgb,var(--background)_68%,transparent)_78%,var(--background)_100%)] sm:bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_srgb,var(--background)_35%,transparent)_30%,transparent_45%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {profile.headline.lead}{" "}
              <em className="font-normal italic text-accent">{profile.headline.emphasis}</em>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {profile.bioShort}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background shadow-soft transition-colors hover:bg-accent-bright"
              >
                View Projects <ArrowRight size={16} />
              </Link>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent-bright"
                >
                  Download Resume <Download size={16} />
                </a>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/60 text-foreground transition-colors hover:border-accent hover:text-accent-bright"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/60 text-foreground transition-colors hover:border-accent hover:text-accent-bright"
              >
                <LinkedinIcon size={18} />
              </a>
              <Link
                href="/contact"
                aria-label="Contact"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/60 text-foreground transition-colors hover:border-accent hover:text-accent-bright"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-6 gap-y-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.highlights.map((label, i) => {
            const Icon = highlightIcons[i % highlightIcons.length];
            return (
              <div key={label} className="flex items-center gap-2.5 text-sm text-muted">
                <Icon size={16} className="shrink-0 text-accent" />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured projects */}
      <Section>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Selected Projects
          </h2>
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent-bright hover:underline"
          >
            View all projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <FeaturedProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {/* About teaser */}
      <Section className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-border bg-surface p-10 shadow-soft md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Want the full story?
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Learn more about my background, skills, and how I like to work.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-soft px-6 py-3 text-sm font-semibold text-accent-bright transition-colors hover:bg-accent hover:text-background"
          >
            About me <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
