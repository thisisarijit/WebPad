import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="p-5 bg-black h-screen text-white">
      ERROR 404 | Page NotFound
      <div className="flex items-center justify-center gap-5  w-full pb-2 border-t py-2 my-10">
        <Link
          to="/"
          className="text-white flex text-xl md:text-2xl lg:text-3xl font-extrabold"
        >
          Web<span className="text-accent">Pad</span>
        </Link>
        <Link to="/editor" className="border hover:bg-gray-500 px-5 py-1 rounded-lg">
          Editor
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
