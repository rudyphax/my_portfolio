import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Section from "@/components/Section";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Section eyebrow="About" title="A bit about me" className="pt-36">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center gap-6 md:items-start">
          <div className="relative h-56 w-56 overflow-hidden rounded-2xl border border-border shadow-soft-lg">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="text-sm text-muted">{profile.role}</p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>

          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-foreground/60 bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={16} /> Download resume
            </a>
          )}
        </div>

        <div className="space-y-10">
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {profile.bioLong.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div>
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Skills &amp; Tools
            </h3>
            <ul className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-soft">
            <p className="text-foreground">Have a project in mind, or just want to connect?</p>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent-bright hover:underline"
            >
              Send me a message <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
