import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../../src/app/(auth)/login/page";

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

  it("renders a remember me field", () => {
    render(<LoginPage />);

    const rem = screen.getByText("Remember me");
    expect(rem).toBeInTheDocument();
  });

  it("renders a Login button", () => {
    render(<LoginPage />);

    const loginBtn = screen.getByText("Log In");
    expect(loginBtn).toBeInTheDocument();
  });

  it("email input field has validation", async () => {
    render(<LoginPage />);

    // Find the email and password input fields
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    // Fill in the email and password fields with invalid values
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    // Find the form element
    const form = screen.getByRole("form");

    // Submit the form
    fireEvent.submit(form);

    // Assert error messages for email and password fields
    await screen.findByText("Email is a required field");
    await screen.findByText("Password is a required field");

    // Assert error messages for email and password fields
    expect(screen.getByText("Email is a required field")).toBeInTheDocument();
    expect(
      screen.getByText("Password is a required field")
    ).toBeInTheDocument();
  });
});
