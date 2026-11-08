import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { profile } from "@/data/profile";

describe("Home page", () => {
  it("renders a Download Resume link pointing at profile.resumeUrl with a download attribute", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /download resume/i });

    expect(link).toHaveAttribute("href", profile.resumeUrl);
    expect(link).toHaveAttribute("download");
  });
});
