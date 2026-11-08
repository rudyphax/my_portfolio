import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Fake values only, never the site owner's real inbox or a real API key.
// These exist purely so the route's "is everything configured?" branch
// passes; no test in this file ever causes a real network call to Resend.
const FAKE_ENV = {
  RESEND_API_KEY: "test_fake_api_key",
  CONTACT_TO_EMAIL: "test-recipient@example.test",
  CONTACT_FROM_EMAIL: "test-sender@example.test",
};

const sendMock = vi.fn();

vi.mock("resend", () => {
  class MockResend {
    emails = { send: sendMock };
  }
  return { Resend: MockResend };
});

function makeRequest(body: unknown, ip = "203.0.113.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I'd love to talk about a project opportunity.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "test-id" }, error: null });
    process.env.RESEND_API_KEY = FAKE_ENV.RESEND_API_KEY;
    process.env.CONTACT_TO_EMAIL = FAKE_ENV.CONTACT_TO_EMAIL;
    process.env.CONTACT_FROM_EMAIL = FAKE_ENV.CONTACT_FROM_EMAIL;
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  });

  it("sends the message to the configured recipient on valid input", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest(validBody, "203.0.113.10"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(1);

    const call = sendMock.mock.calls[0][0];
    // Proves the email is routed to whatever CONTACT_TO_EMAIL is configured
    // to, without ever hardcoding or asserting against a real address.
    expect(call.to).toBe(FAKE_ENV.CONTACT_TO_EMAIL);
    expect(call.replyTo).toBe(validBody.email);
  });

  it("gives the email a subject that clearly identifies it as a portfolio contact form message", async () => {
    const { POST } = await import("./route");
    await POST(makeRequest(validBody, "203.0.113.11"));

    const call = sendMock.mock.calls[0][0];
    expect(call.subject).toContain(validBody.name);
    expect(call.subject.toLowerCase()).toContain("portfolio");
  });

  it("never echoes the configured recipient address back in the response body", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest(validBody, "203.0.113.12"));
    const text = await res.text();

    expect(text).not.toContain(FAKE_ENV.CONTACT_TO_EMAIL);
    expect(text).not.toContain("@example.test");
  });

  it("rejects an invalid email and never calls the email provider", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({ ...validBody, email: "not-an-email" }, "203.0.113.13")
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a header-injection attempt in the name field", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest(
        { ...validBody, name: "Jane\r\nBcc: attacker@evil.com" },
        "203.0.113.14"
      )
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON bodies", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.15" },
      body: "{not valid json",
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("silently no-ops when the honeypot field is filled in, without sending an email", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({ ...validBody, company: "I am a bot" }, "203.0.113.16")
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate-limits repeated requests from the same IP", async () => {
    const { POST } = await import("./route");
    const ip = "203.0.113.17";

    for (let i = 0; i < 3; i++) {
      const res = await POST(makeRequest(validBody, ip));
      expect(res.status).toBe(200);
    }

    const limited = await POST(makeRequest(validBody, ip));
    expect(limited.status).toBe(429);
    // Only the first 3 should have gone through to the email provider.
    expect(sendMock).toHaveBeenCalledTimes(3);
  });

  it("does not rate-limit requests from a different IP", async () => {
    const { POST } = await import("./route");
    for (let i = 0; i < 3; i++) {
      await POST(makeRequest(validBody, "203.0.113.18"));
    }
    const res = await POST(makeRequest(validBody, "203.0.113.19"));
    expect(res.status).toBe(200);
  });

  it("returns a generic error and never sends when email isn't configured", async () => {
    delete process.env.RESEND_API_KEY;
    const { POST } = await import("./route");
    const res = await POST(makeRequest(validBody, "203.0.113.20"));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.ok).toBe(false);
    expect(json.error).not.toContain("@");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns a generic error when the email provider fails", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    const { POST } = await import("./route");
    const res = await POST(makeRequest(validBody, "203.0.113.21"));
    const json = await res.json();

    expect(res.status).toBe(502);
    expect(json.ok).toBe(false);
  });
});
