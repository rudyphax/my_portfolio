# Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS. Contact form sends email via [Resend](https://resend.com) through a Next.js Route Handler, so your real email address is never shown on the site.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Resend** for transactional email (contact form)
- **Zod** for server-side form validation
- **lucide-react** for icons

## Getting started

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | From your [Resend dashboard](https://resend.com/api-keys). Free tier is plenty for a portfolio contact form. |
| `CONTACT_TO_EMAIL` | The Gmail address you want messages forwarded to. |
| `CONTACT_FROM_EMAIL` | Use `onboarding@resend.dev` to start (works instantly, no setup). Once you verify your own domain on Resend, switch this to something like `contact@yourdomain.com`. |

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content to personalize before launch

Everything editorial lives in two files — no need to touch components:

- [`src/data/profile.ts`](src/data/profile.ts) — name, role, tagline, bio, skills, resume link, social links
- [`src/data/projects.ts`](src/data/projects.ts) — your project list (title, description, stack, live URL, GitHub URL)

Replace the profile photo at `public/images/profile.webp`, and drop real project screenshots in `public/images/projects/` (update the `image` path for each project in `projects.ts` to match — the placeholder SVGs there are just stand-ins).

If you want a downloadable resume, add a PDF at `public/resume.pdf` (the path is already wired up in `profile.ts` via `resumeUrl`; set it to `""` to hide the download button instead).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the three environment variables above in the Vercel project settings (Settings → Environment Variables).
4. Deploy. Vercel builds and redeploys automatically on every push to `main`.

## Project structure

```
src/
  app/
    page.tsx            Home (hero + featured projects)
    projects/page.tsx   Full projects grid
    about/page.tsx      Bio + skills
    contact/page.tsx    Contact form page
    api/contact/route.ts  Server-side route that validates input and sends email via Resend
  components/           Navbar, Footer, ProjectCard, ContactForm, etc.
  data/                 profile.ts and projects.ts — edit these for your content
  lib/validation.ts     Zod schema shared by the API route
```

## Testing

Two layers of automated tests cover the contact form and resume download:

- **Unit/integration tests** ([Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react)): validate the Zod schema directly, exercise the `/api/contact` route handler with the email provider mocked out, and check component-level wiring (honeypot field, Download Resume links).
- **End-to-end tests** ([Playwright](https://playwright.dev)): drive a real browser against the running app to confirm the resume actually downloads as a valid PDF from both the home and About pages, that a valid contact form submission shows a success state, that the honeypot silently no-ops instead of sending a message, and that the API itself rejects an email header-injection attempt sent directly over HTTP.

```bash
npm run test          # unit/integration tests, single run
npm run test:watch    # unit/integration tests, watch mode
npm run test:e2e      # end-to-end tests (starts the dev server automatically)
npm run test:e2e:ui   # end-to-end tests with Playwright's interactive UI
```

The E2E tests run against fake `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` values set in `playwright.config.ts` (never your real ones), and every test path that would otherwise reach the email provider is either mocked at the network layer or short-circuited by validation/honeypot logic before it gets there, so no test run ever sends a real email.

### What's covered on the security side

- Zod rejects carriage returns, line feeds, and null bytes in `name`, `email`, and `message` before they can be interpolated into the outgoing email's subject or reply-to header, which is the standard defense against email header injection.
- The honeypot field accepts any value without a distinctive validation error, so a bot filling in every field can't tell its submission was silently discarded instead of sent.
- A basic in-memory rate limit caps repeated submissions per IP.
- The contact recipient address only ever lives in an environment variable; it's asserted against in tests without ever being hardcoded, and a test confirms it's never echoed back in an API response.

## Notes

- The contact form has a honeypot field plus a basic in-memory rate limit (3 requests/minute per IP) to blunt casual spam/bots. It resets on every server restart/redeploy — swap in a durable store (e.g. Upstash Redis) if the form ever gets targeted seriously.
- `npm run lint` and `npx tsc --noEmit` are both clean; run them after any change before deploying.
