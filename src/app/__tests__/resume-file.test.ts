import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

describe("resume file", () => {
  it("profile.resumeUrl points to a file that actually exists in /public", () => {
    const publicPath = path.join(process.cwd(), "public", profile.resumeUrl);
    expect(existsSync(publicPath)).toBe(true);
  });

  it("the resume file is a real, non-empty PDF", () => {
    const publicPath = path.join(process.cwd(), "public", profile.resumeUrl);
    const buffer = readFileSync(publicPath);

    expect(buffer.length).toBeGreaterThan(0);
    // Every valid PDF starts with this magic header.
    expect(buffer.subarray(0, 5).toString("ascii")).toBe("%PDF-");
  });
});
