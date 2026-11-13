// AI Golf Coach and Portfolio Website details are verified. GOGz still needs
// a real stack/description/links (TODO, confirm those). `image` files go in
// /public/images/projects/. Leave `liveUrl` or `githubUrl` empty ("") to
// hide that button on a card.

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-golf-coach",
    title: "AI Golf Coach",
    description:
      "A full-stack AI analysis platform that turns golf swing video into structured coaching feedback using LLM prompt engineering.",
    stack: ["React", "TypeScript", "Node.js", "AI/LLM Integration"],
    image: "/images/projects/ai-golf-swing-analyzer.png",
    liveUrl: "https://swingcoach.rudyphaxay.com/",
    githubUrl: "https://github.com/rudyphax/ai_golf_coach",
    featured: true,
  },
  {
    slug: "gogz",
    title: "GOGz",
    description: "A social golf app for planning, tracking, and sharing rounds.",
    stack: ["Social", "Mobile", "Golf"], // TODO: swap in your real stack
    image: "/images/projects/gogz_project_screenshot.png",
    liveUrl: "https://gogz.rudyphaxay.com",
    githubUrl: "https://github.com/rudyphax/gogz_v2",
    featured: true,
  },
  {
    slug: "portfolio",
    title: "Portfolio Website",
    description:
      "My personal portfolio site itself, built with Next.js and TypeScript, featuring a privacy-protecting contact form and full automated test coverage.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Resend",
      "Vitest",
      "Playwright",
      "Agentic AI",
    ],
    image: "/images/projects/portfolio.jpg",
    liveUrl: "https://rudyphaxay.com",
    githubUrl: "https://github.com/rudyphax/my_portfolio",
    featured: false,
  },
];
