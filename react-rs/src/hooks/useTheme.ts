import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useTheme(): { theme: string; toggleTheme: () => void } {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: "light",
      toggleTheme: () => {},
    };
  }

  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
  };
}
