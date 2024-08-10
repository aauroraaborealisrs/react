import "@testing-library/jest-dom";
import { ThemeContext, ThemeProvider } from "../app/components/ThemeContext";

import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ThemeProvider", () => {
  it("provides the default theme", () => {
    const TestComponent = () => {
      const context = useContext(ThemeContext);
      if (!context) throw new Error("ThemeContext is undefined");

      return <span>Current theme: {context.theme}</span>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText("Current theme: light")).toBeInTheDocument();
  });

  it("toggles the theme when toggleTheme is called", () => {
    const TestComponent = () => {
      const context = useContext(ThemeContext);
      if (!context) throw new Error("ThemeContext is undefined");

      return (
        <>
          <span>Current theme: {context.theme}</span>
          <button onClick={context.toggleTheme}>Toggle Theme</button>
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText("Current theme: light")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(screen.getByText("Current theme: dark")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(screen.getByText("Current theme: light")).toBeInTheDocument();
  });

  it("applies the correct data-theme attribute", () => {
    const TestComponent = () => {
      const context = useContext(ThemeContext);
      if (!context) throw new Error("ThemeContext is undefined");

      return (
        <>
          <div data-testid="theme-wrapper" data-theme={context.theme}>
            Theme container
          </div>
          <button onClick={context.toggleTheme}>Toggle Theme</button>
        </>
      );
    };

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeWrapper = getByTestId("theme-wrapper");

    expect(themeWrapper).toHaveAttribute("data-theme", "light");

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(themeWrapper).toHaveAttribute("data-theme", "dark");

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(themeWrapper).toHaveAttribute("data-theme", "light");
  });
});
