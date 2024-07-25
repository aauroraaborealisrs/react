import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContext, ThemeProvider } from "../src/ThemeContext";

const TestComponent: React.FC = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  return (
    <div>
      <span>Current theme: {context.theme}</span>
      <button onClick={context.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeProvider component", () => {
  test("renders with initial theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText("Current theme: light")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Toggle Theme/i }),
    ).toBeInTheDocument();
  });

  test("toggles theme on button click", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByRole("button", { name: /Toggle Theme/i });

    expect(screen.getByText("Current theme: light")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText("Current theme: dark")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText("Current theme: light")).toBeInTheDocument();
  });
});
