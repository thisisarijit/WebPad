import React from "react";
// import ThemeToggleButton from "./ThemeToggleButton";
import { Pencil, Plus } from "lucide-react";
import ThemeToggleButton from "./ui/ThemeToggleButton";

const Navbar = ({handleSave, handleReset}) => {
  return (
    <nav className="w-full py-1 border-2 rounded-lg">
      <div className="container w-full rounded-lg flex items-center justify-between gap-5">
          <span className="font-extrabold text-2xl text-accent">WebPad</span>

        <div className="w-full gap-2 flex p-1 items-center just">
          <span className="bg-border hover:bg-panel px-4 py-1 rounded-lg">Untitled</span>
          <Plus className="cursor-pointer text-panel hover:text-text-primary " />
        </div>

        <div className="flex items-center justify-around gap-5">
          <div className="rounded-full">
            <ThemeToggleButton />
            {/* <ThemeToggle /> */}
          </div>
          <button onClick={handleReset} className="cosmic-button">
            Reset
          </button>
          <button onClick={handleSave} className="cosmic-button bg-green-600 hover:bg-green-400">Save</button>
          <div className="rounded-full h-8 w-8 bg-accent flex items-center justify-center font-extrabold">A</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
