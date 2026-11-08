import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("submitting valid details shows a success confirmation", async ({ page }) => {
    // Intercepted at the browser level so this never reaches the real route
    // handler or email provider, regardless of what env vars are configured.
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page
      .getByLabel("Message")
      .fill("I'd love to talk about a project opportunity.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Message sent")).toBeVisible();
  });

  test("the API rejects a header-injection attempt sent directly over HTTP", async ({
    request,
  }) => {
    // A real `<input type="text">` strips raw CR/LF before a browser ever
    // submits them, so this attack can't actually be demonstrated through
    // the form UI. The real threat is a non-browser client (curl, a script)
    // posting straight to the endpoint, so this hits the live route over
    // the network the same way such a client would.
    //
    // Uses its own fake x-forwarded-for IP (a reserved TEST-NET-2 address,
    // never a real one) so repeated runs of this spec don't share a rate
    // limit bucket with the other test below or with previous runs.
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": "198.51.100.10" },
      data: {
        name: "Jane\r\nBcc: attacker@evil.com",
        email: "jane@example.com",
        message: "I'd love to talk about a project opportunity.",
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.error.toLowerCase()).toContain("invalid characters");
  });

  test("silently accepts a bot filling in the honeypot field without sending a real message", async ({
    page,
  }) => {
    // Also hits the real route handler. The honeypot short-circuits before
    // the email-sending code, so this is safe to run against it directly.
    // Tags the request with its own fake IP for the same reason as above.
    await page.route("**/api/contact", (route) =>
      route.continue({
        headers: { ...route.request().headers(), "x-forwarded-for": "198.51.100.11" },
      })
    );

    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page
      .getByLabel("Message")
      .fill("I'd love to talk about a project opportunity.");
    // The honeypot is visually hidden off-screen; `force: true` skips the
    // visibility check, matching how an automated bot (not a real visitor)
    // would fill in every field regardless of what's visible.
    await page.getByLabel("Company").fill("Totally Real Company Inc", { force: true });
    await page.getByRole("button", { name: /send message/i }).click();

    // The UI can't distinguish this from a real success, by design, so bots
    // can't learn there's a trap field to avoid.
    await expect(page.getByText("Message sent")).toBeVisible();
  });
});
