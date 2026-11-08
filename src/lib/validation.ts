import { z } from "zod";

// Rejects carriage returns, line feeds, and null bytes. `name` and `email` get
// interpolated into email headers (subject, reply-to) downstream, so a value
// containing CR/LF could be used to inject extra headers (e.g. a forged Bcc)
// into the outgoing message if the mail provider didn't already guard against
// it. Validating here means the request is rejected before it ever reaches
// the email-sending code, instead of relying solely on a third party's escaping.
const noHeaderInjection = /^[^\r\n\0]*$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100)
    .refine((v) => noHeaderInjection.test(v), "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine((v) => noHeaderInjection.test(v), "Email contains invalid characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000)
    .refine((v) => !v.includes("\0"), "Message contains invalid characters"),
  // Honeypot field: real users never fill this in; bots that auto-fill every
  // field will. Accepts any value (including junk) so a filled-in honeypot
  // doesn't fail validation with a distinct error. The route handler checks
  // this value itself and responds as if the message sent, without actually
  // sending anything, so bots can't learn there's a hidden field to avoid.
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
