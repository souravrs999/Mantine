import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "../src/app/(auth)/login/page";

describe("Login Page", () => {
  it("renders a heading", () => {
    render(<LoginPage />);
    const heading = screen.getByRole("heading", {
      name: /welcome back/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders email & password field", () => {
    render(<LoginPage />);

    const emailField = screen.getByRole("input", {
      name: /email/i,
    });
    const passwordField = screen.getByRole("input", {
      name: /password/i,
    });

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });
});
