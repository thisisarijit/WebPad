import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const LeftSideBar = ({ onToggle }) => {
  return (
    <aside className="rounded-lg border-2 p-2">
      <button type="button" onClick={onToggle} aria-label="Toggle sidebar">
        <PanelLeftClose size={25} />
      </button>
    </aside>
  );
};

export default LeftSideBar;
