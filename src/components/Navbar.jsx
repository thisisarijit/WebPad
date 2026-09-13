import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { Pencil, Plus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full py-1 border-2 rounded-lg">
      <div className="container w-full rounded-lg flex items-center justify-between gap-5">
        {/* <div className="flex items-center gap-10 "> */}
          <span className="font-extrabold text-2xl text-accent">WebPad</span>
        {/* </div> */}

        <div className="w-full gap-2 flex p-1 items-center just">
          <span className="bg-border hover:bg-panel px-4 py-1 rounded-lg">Untitled</span>
          <Plus className="cursor-pointer text-panel hover:text-text-primary " />
        </div>

        <div className="flex items-center justify-around gap-5">
          <div className="rounded-full">
            <ThemeToggleButton />
            {/* <ThemeToggle /> */}
          </div>
          <div className="cosmic-button hover:bg-border bg-background text-accent border-accent border">
            Save
          </div>
          <div className="cosmic-button text-background">Run</div>
          <div className="rounded-full h-8 w-8 bg-green-400"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
