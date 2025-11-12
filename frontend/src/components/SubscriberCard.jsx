import React from "react";
import { useNavigate } from "react-router-dom";
import SubscribeBtn from "./SubscribeBtn";

function SubscriberCard({ avatar, username, fullName }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-gradient-to-br from-[#111111] via-[#181818] to-[#1e1e1e] text-white p-5 rounded-2xl shadow-lg border border-gray-800 hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300">
      {/* Clickable user section */}
      <button
        onClick={() => navigate(`/users/c/${username}`)}
        className="flex items-center space-x-4 text-left w-full"
      >
        <img
          src={avatar}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 hover:scale-105 transition-transform duration-300"
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors duration-200">
            {fullName}
          </h2>
          <p className="text-sm text-gray-400">
            @{username} • Subscribers
          </p>
        </div>
      </button>

      {/* Subscribe Button */}
      <div className="ml-4">
        <SubscribeBtn username={username} />
      </div>
    </div>
  );
}

export default SubscriberCard;
