import { defineConfig, devices } from "@playwright/test";

// Fake values only. The honeypot and validation-rejection specs exercise the
// real route handler, but every path they hit returns before ever calling
// the email provider, so these never need to be (and never are) real
// credentials or a real inbox.
const FAKE_ENV = {
  RESEND_API_KEY: "test_fake_api_key",
  CONTACT_TO_EMAIL: "test-recipient@example.test",
  CONTACT_FROM_EMAIL: "test-sender@example.test",
};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    env: FAKE_ENV,
    timeout: 120_000,
  },
});
