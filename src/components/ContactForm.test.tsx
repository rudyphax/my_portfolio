import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function fillAndSubmit(options?: { name?: string; email?: string; message?: string }) {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.type(screen.getByLabelText("Name"), options?.name ?? "Jane Doe");
  await user.type(screen.getByLabelText("Email"), options?.email ?? "jane@example.com");
  await user.type(
    screen.getByLabelText("Message"),
    options?.message ?? "I'd love to talk about a project opportunity."
  );
  await user.click(screen.getByRole("button", { name: /send message/i }));
}

describe("ContactForm", () => {
  it("includes a honeypot field that is hidden from sighted users", () => {
    render(<ContactForm />);
    const honeypot = screen.getByLabelText("Company", { selector: "input" });

    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
    // The honeypot's wrapper is visually hidden off-screen rather than
    // display:none, so simple bots that skip hidden fields still fill it in.
    expect(honeypot.closest("div")).toHaveClass("absolute");
  });

  it("submits the form data as JSON to /api/contact and shows a success state", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await fillAndSubmit();

    await waitFor(() => expect(screen.getByText("Message sent")).toBeInTheDocument());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(options.method).toBe("POST");

    const body = JSON.parse(options.body);
    expect(body).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "I'd love to talk about a project opportunity.",
    });
  });

  it("shows the server's error message when the submission is rejected", async () => {
    // Uses otherwise well-formed input (the browser's own HTML5 constraint
    // validation, e.g. type="email", would block submission before our code
    // ever runs for malformed input) to isolate how the component handles an
    // error response coming back from the server.
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: "Too many requests. Please try again in a minute." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await fillAndSubmit();

    await waitFor(() =>
      expect(
        screen.getByText("Too many requests. Please try again in a minute.")
      ).toBeInTheDocument()
    );
  });

  it("shows a generic error message on a network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );

    await fillAndSubmit();

    await waitFor(() =>
      expect(
        screen.getByText(/network error.*check your connection/i)
      ).toBeInTheDocument()
    );
  });
});
