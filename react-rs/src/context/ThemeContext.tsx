// import React, { createContext, useState, ReactNode } from "react";

// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType | undefined>(
//   undefined,
// );

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div className={`wrapper ${theme}`}>
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// // context/ThemeContext.tsx
// import React, { createContext, useState, ReactNode } from "react";

// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType | undefined>(
//   undefined,
// );

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div className={`wrapper ${theme}`}>
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };


// context/ThemeContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="wrapper" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
