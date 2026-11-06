import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
  // Honeypot field: real users never fill this in. Bots that auto-fill every field will.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
