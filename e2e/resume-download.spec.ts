import { test, expect } from "@playwright/test";

test.describe("Resume download", () => {
  test("downloading from the home page hero produces a real PDF", async ({ page }) => {
    await page.goto("/");

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: /download resume/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream!) {
      chunks.push(chunk as Buffer);
    }
    const buffer = Buffer.concat(chunks);

    expect(buffer.length).toBeGreaterThan(0);
    expect(buffer.subarray(0, 5).toString("ascii")).toBe("%PDF-");
  });

  test("downloading from the About page also produces a real PDF", async ({ page }) => {
    await page.goto("/about");

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: /download resume/i }).click();
    const download = await downloadPromise;

    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream!) {
      chunks.push(chunk as Buffer);
    }
    const buffer = Buffer.concat(chunks);

    expect(buffer.subarray(0, 5).toString("ascii")).toBe("%PDF-");
  });
});
