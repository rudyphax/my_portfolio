// TODO: Replace any remaining placeholder values below with your real info.
// This is the single source of truth for name/role/bio copy used across the site.

export const profile = {
  name: "Rudy Phaxay",
  role: "Full-Stack Software Engineer",
  brandLabel: "WORKFOLIO", // small tracked label under the logo wordmark
  headline: {
    lead: "Building thoughtful products with",
    emphasis: "engineering depth.",
  },
  location: "City, State", // TODO: your real city/state
  photo: "/images/profile.webp",
  // Full-bleed hero photo — cropped from the reference design and extended
  // leftward (flat color, feathered) so it reads as one continuous background
  // at any hero width. Replace with your own photo processed the same way.
  heroPhoto: "/images/hero-photo-wide.png",
  availableForWork: true, // toggles the "Available for work" badges on the hero and photo
  resumeUrl: "/resume.pdf", // TODO: drop your resume PDF in /public and update this path, or remove the download link
  bioShort:
    "I design, build, and ship web and mobile products that solve real problems, create meaningful user experiences, and deliver lasting impact.",
  bioLong: [
    "TODO: Replace this with your real bio. A couple of short paragraphs works well — how you got into software, what you focus on now, and what kind of problems you enjoy solving.",
    "TODO: Second paragraph — mention your current role/availability, and anything that makes you distinct (industries you've worked in, systems you've shipped, teams you've led).",
  ],
  highlights: [
    "Full-Stack Development",
    "Product Development",
    "AI & Automation",
    "Cloud & DevOps",
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
  ],
  social: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    // Email intentionally omitted from the public site — handled via the contact form instead.
  },
};
