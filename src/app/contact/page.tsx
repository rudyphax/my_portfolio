import type { Metadata } from "next";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Let's work together"
      description="Have a role, project, or idea you'd like to talk through? Send a message below and it goes straight to my inbox."
      className="pt-36"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
        <div className="relative">
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="mb-1 font-serif font-semibold text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted">{profile.role}</p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Find Me Elsewhere
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-bright"
              >
                <GithubIcon size={18} /> GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-bright"
              >
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
