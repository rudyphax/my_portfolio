// TODO: Confirm/replace these — the first two were pulled from your reference
// screenshot, so double-check the descriptions and fill in the real tech stack,
// live URL, and GitHub URL for each. `image` files go in /public/images/projects/.
// Leave `liveUrl` or `githubUrl` empty ("") to hide that button on a card.

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
    slug: "ai-golf-swing-analyzer",
    title: "AI Golf Swing Analyzer",
    description: "Computer vision + AI to analyze and improve your golf swing.",
    stack: ["Computer Vision", "AI/ML", "Mobile"], // TODO: swap in your real stack (e.g. Python, PyTorch, Swift...)
    image: "/images/projects/ai-golf-swing-analyzer.png",
    liveUrl: "",
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
