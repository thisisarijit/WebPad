import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center
      rounded-full border border-border bg-panel/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-accent/10 cursor-pointer
      "
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 md:h-5 md:w-5 text-blue-800" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
