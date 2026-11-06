import type { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-20 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          )}
          {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
