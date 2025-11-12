import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-16 h-16">
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-md animate-pulse"></div>
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin relative z-10"></div>
      </div>
    </div>
  );
}

export default Loading;
