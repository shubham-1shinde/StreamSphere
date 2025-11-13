import axios from "axios";
import React, { useState } from "react";
import {
  FaRegComment,
  FaHeart,
  FaChartBar,
} from "react-icons/fa";

function TweetCard({ _id, content, fullName, username, avatar, createdAt }) {
  const tweetId = _id;
  const [isTweetLiked, setIsTweetLiked] = useState(false);
  const [totalTweetLikes, setTotalTweetLikes] = useState(0);

  return (
    <div className="flex space-x-3 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-white p-5 border-b border-gray-800 hover:bg-[#1b1b1b]/70 transition-all duration-300 cursor-pointer rounded-xl">
      {/* Avatar */}
      <img
        src={avatar}
        alt="User Avatar"
        className="w-12 h-12 rounded-full object-cover border border-gray-700 hover:border-blue-500 transition-all duration-300"
      />

      {/* Tweet Content */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-white hover:text-blue-400 transition-colors duration-200">
            {fullName}
          </span>
          <span className="text-gray-500">@{username} • {createdAt}</span>
        </div>

        <p className="mt-2 text-[15px] leading-relaxed text-gray-200">
          {content}
        </p>

        {/* Action Row */}
        <div className="flex justify-between text-gray-400 mt-4 text-sm max-w-md">
          {/* Like */}
          <button
            onClick={async () => {
              const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/likes/toggle/t/${tweetId}`);
              const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/likes/tweets/${tweetId}`);
              setTotalTweetLikes(resp.data.data);
              setIsTweetLiked(res.data.message === "Like added successfully on tweet");
            }}
            className="flex items-center gap-2 hover:text-pink-500 transition-colors duration-200"
          >
            <FaHeart
              className={`transition-transform duration-300 ${
                isTweetLiked ? "text-pink-600 scale-110" : "text-gray-400"
              }`}
            />
            <span>{totalTweetLikes}</span>
          </button>

          {/* Comments */}
          <div className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200">
            <FaRegComment /> <span>7K</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-2 hover:text-green-400 transition-colors duration-200">
            <FaChartBar /> <span>7.9M</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
