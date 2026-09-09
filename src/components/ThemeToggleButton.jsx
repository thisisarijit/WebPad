import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleTheme = () => {
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <button
      onClick={handleTheme}
      className=" p-2 rounded-full transition-colors duration-300 focus:outline-hidden cursor-pointer"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-blue-800" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
