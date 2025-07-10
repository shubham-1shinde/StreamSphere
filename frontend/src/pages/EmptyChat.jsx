import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Video, ZoomIn } from "lucide-react";   //  npm install lucide-react

const EmptyChat = () => {
  return (
    <div className="flex-1 bg-[#0b141a] flex items-center justify-center text-white h-screen">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6 text-gray-600">
          <Video size={56} className="text-purple-500" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">StreamSphere for Windows</h2>

        <p className="text-gray-400 text-sm">
          Send and receive messages without keeping your phone online.
        </p>

        <div className="text-xs text-gray-600 mt-6 flex justify-center items-center gap-1">
          <span>🔒</span>
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
