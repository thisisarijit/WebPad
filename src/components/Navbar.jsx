import React from "react";
// import ThemeToggleButton from "./ThemeToggleButton";
import { Pencil, Plus, RefreshCcw, Save } from "lucide-react";
import ThemeToggleButton from "./ui/ThemeToggleButton";

const Navbar = ({handleSave, handleReset}) => {
  return (
    <nav className="w-full py-1 border-2 rounded-lg ">
      <div className="container w-full rounded-lg flex items-center justify-between gap-5">
          <span className="font-extrabold text-2xl text-accent">WebPad</span>

        <div className="w-full gap-2 flex p-1 items-center">
          {/* <span className="bg-border hover:bg-panel px-4 py-1 rounded-lg">Untitled</span>
          <Plus className="cursor-pointer text-panel hover:text-text-primary " /> */}
          <select name="proj" className="cursor-pointer border-none bg-border px-2 py-1 rounded-lg">
            <option value="proj1">My project 1</option>
            <option value="proj1">My project 2</option>
            <option value="proj1">My project 3</option>
            <option value="proj1">My project 4</option>
          </select>
          <Plus className="cursor-pointer text-panel hover:text-text-primary " /> 
        </div>

        <div className="flex items-center justify-around gap-5">
          <div className="rounded-full">
            <ThemeToggleButton />
          </div>
          <button onClick={handleReset} className="cosmic-button bg-transparent hover:bg-transparent border-accent border-2 text-accent flex items-center gap-1">
            <RefreshCcw size={15} />
            Reset
          </button>
          <button onClick={handleSave} className="cosmic-button bg-green-600 hover:bg-green-400 flex items-center gap-1">  <Save size={15} />Save</button>
          <div className="rounded-full h-8 w-8 bg-accent flex items-center justify-center font-extrabold">A</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
