import React from "react";
import { Video } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center h-screen text-white bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6]">
      <div className="text-center max-w-md p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-6 text-purple-400 animate-pulse">
          <Video size={64} className="drop-shadow-lg" />
        </div>

        <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          StreamSphere for Web
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed">
          Send and receive messages without keeping your phone online.
          <br />
          Experience seamless communication powered by secure sync.
        </p>

        <div className="text-xs text-gray-400 mt-6 flex justify-center items-center gap-1">
          <span>🔒</span>
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
