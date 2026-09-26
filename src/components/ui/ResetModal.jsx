import React from "react";

const ResetModal = ({ isOpen, title, message, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-border p-6">
        <h2 className="text-xl font-semibold text-text-primary ">{title}</h2>
        <p className="mt-2 text-text-secondary text-sm">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="cosmic-button bg-transparent text-accent border-accent border hover:bg-transparent"
          >
            Cancel
          </button>
          <button type="button" className="cosmic-button" onClick={onConfirm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
