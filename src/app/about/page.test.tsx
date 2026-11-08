import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";
import { profile } from "@/data/profile";

describe("About page", () => {
  it("renders a download resume link pointing at profile.resumeUrl with a download attribute", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", { name: /download resume/i });

    expect(link).toHaveAttribute("href", profile.resumeUrl);
    expect(link).toHaveAttribute("download");
  });
});
