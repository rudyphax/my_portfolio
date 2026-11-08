// AI Golf Coach details are verified against your resume. GOGz and Project
// Three still need a real stack/description/links — TODO, confirm those.
// `image` files go in /public/images/projects/. Leave `liveUrl` or
// `githubUrl` empty ("") to hide that button on a card.

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
    liveUrl: "https://ai-golf-coach-eight.vercel.app/",
    githubUrl: "",
    featured: true,
  },
  {
    slug: "gogz",
    title: "GOGz",
    description: "A social golf app for planning, tracking, and sharing rounds.",
    stack: ["Social", "Mobile", "Golf"], // TODO: swap in your real stack
    image: "/images/projects/gogz.png",
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project Three",
    description:
      "TODO: One or two sentences on what this project does, who it's for, and the problem it solves.",
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/images/projects/placeholder-3.svg",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
];
