import { renderHook } from "@testing-library/react";
import { useTheme } from "../app/hooks/useTheme";
import { ThemeContext } from "../app/components/ThemeContext";

describe("useTheme", () => {
  it("throws an error when used outside of ThemeProvider", () => {
    try {
      renderHook(() => useTheme());
    } catch (error) {
      expect(error.message).toBe(
        "useTheme must be used within a ThemeProvider",
      );
    }
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
