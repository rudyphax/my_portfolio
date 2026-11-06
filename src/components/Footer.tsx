import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted">
          &copy; {year} {profile.name}. Built with Next.js.
        </p>

        <div className="flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent-bright"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent-bright"
          >
            <LinkedinIcon size={20} />
          </a>
          <Link
            href="/contact"
            aria-label="Contact"
            className="text-muted transition-colors hover:text-accent-bright"
          >
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
