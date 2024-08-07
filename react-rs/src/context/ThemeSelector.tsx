import React from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeSelector: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-selector">
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={toggleTheme}
        />
        Light
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        Dark
      </label>
    </div>
  );
};

export default ThemeSelector;
