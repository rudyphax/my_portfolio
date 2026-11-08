import { describe, expect, it } from "vitest";
import { contactSchema } from "./validation";

const validInput = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I'd love to talk about a project opportunity.",
};

describe("contactSchema", () => {
  it("accepts a well-formed submission", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a name over 100 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects a message over 5000 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "a".repeat(5001) });
    expect(result.success).toBe(false);
  });

  describe("header injection protection", () => {
    it("rejects a name containing a carriage return / newline", () => {
      const result = contactSchema.safeParse({
        ...validInput,
        name: "Jane\r\nBcc: attacker@evil.com",
      });
      expect(result.success).toBe(false);
    });

    it("rejects a name containing a bare newline", () => {
      const result = contactSchema.safeParse({ ...validInput, name: "Jane\nDoe" });
      expect(result.success).toBe(false);
    });

    it("rejects an email address containing a carriage return / newline", () => {
      // Deliberately bypasses the email-format check to confirm the header
      // injection guard is a separate, independent layer of defense.
      const result = contactSchema.safeParse({
        ...validInput,
        email: "jane@example.com\r\nBcc:attacker@evil.com",
      });
      expect(result.success).toBe(false);
    });

    it("rejects a name containing a null byte", () => {
      const result = contactSchema.safeParse({ ...validInput, name: "Jane\0Doe" });
      expect(result.success).toBe(false);
    });

    it("rejects a message containing a null byte", () => {
      const result = contactSchema.safeParse({
        ...validInput,
        message: "Hello there\0, this is my message.",
      });
      expect(result.success).toBe(false);
    });

    it("allows ordinary multi-line content in the message body", () => {
      // Newlines are legitimate in a textarea-driven message body; only
      // single-line header fields (name, email) need to reject them.
      const result = contactSchema.safeParse({
        ...validInput,
        message: "Line one of my message.\nLine two of my message.",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("honeypot field", () => {
    it("accepts a submission with an empty honeypot", () => {
      const result = contactSchema.safeParse({ ...validInput, company: "" });
      expect(result.success).toBe(true);
    });

    it("accepts a submission with no honeypot field at all", () => {
      const result = contactSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("still passes validation when a bot fills in the honeypot", () => {
      // The honeypot must not fail schema validation with a distinctive
      // error, otherwise a bot filling every field learns which one to
      // leave blank. The route handler is responsible for silently
      // no-op'ing when this field is non-empty instead.
      const result = contactSchema.safeParse({ ...validInput, company: "Acme Inc" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.company).toBe("Acme Inc");
      }
    });
  });

  it("trims leading/trailing whitespace from name, email, and message", () => {
    const result = contactSchema.safeParse({
      name: "  Jane Doe  ",
      email: "  jane@example.com  ",
      message: "  A message with padding around it.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jane Doe");
      expect(result.data.email).toBe("jane@example.com");
      expect(result.data.message).toBe("A message with padding around it.");
    }
  });
});
