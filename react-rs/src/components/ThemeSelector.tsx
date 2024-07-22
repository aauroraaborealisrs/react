import React from "react";
import { useTheme } from "../useTheme";

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-selector">
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === "light"}
          onChange={() => setTheme("light")}
        />
        Light
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")}
        />
        Dark
      </label>
    </div>
  );
};

export default ThemeSelector;
