import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext, ThemeProvider } from "../src/context/ThemeContext";

describe("ThemeProvider", () => {
  it("provides the default theme", () => {
    const TestComponent = () => {
      const context = React.useContext(ThemeContext);
      if (!context) throw new Error("ThemeContext is undefined");

      return <span>Current theme: {context.theme}</span>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
  });

  it("toggles the theme when toggleTheme is called", () => {
    const TestComponent = () => {
      const context = React.useContext(ThemeContext);
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

    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/toggle theme/i));

    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/toggle theme/i));

    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
  });

  it("applies the correct data-theme attribute", () => {
    const TestComponent = () => {
      const context = React.useContext(ThemeContext);
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

    fireEvent.click(screen.getByText(/toggle theme/i));

    expect(themeWrapper).toHaveAttribute("data-theme", "dark");

    fireEvent.click(screen.getByText(/toggle theme/i));

    expect(themeWrapper).toHaveAttribute("data-theme", "light");
  });
});
