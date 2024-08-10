import { renderHook } from "@testing-library/react";
import { useTheme } from "../src/hooks/useTheme";
import { ThemeContext } from "../src/context/ThemeContext";

describe("useTheme", () => {
  it("throws an error when used outside of ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrowError(
      "useTheme must be used within a ThemeProvider",
    );
  });

  it("returns context value when used within ThemeProvider", () => {
    const mockContextValue = {
      theme: "light",
      toggleTheme: jest.fn(),
    };

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext.Provider value={mockContextValue}>
          {children}
        </ThemeContext.Provider>
      ),
    });

    expect(result.current).toBe(mockContextValue);
  });
});
