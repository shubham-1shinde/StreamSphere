import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "../components/TweetCard";

function DashboardTweets() {
  const { username } = useParams();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/tweets/users/${username}`);
        setTweets(res.data.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };
    fetchTweets();
  }, [username]);

  return (
    <main className="max-w-8xl p-6 min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] text-white">
      <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Tweets by @{username}
      </h1>

      {tweets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {tweets.map((tweet, index) => (
            <div
              key={index}
              className="rounded-2xl p-4 bg-black/40 border border-gray-800 shadow-lg hover:shadow-blue-500/20 backdrop-blur-md transition-all"
            >
              <TweetCard {...tweet} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-400 text-lg">
          No tweets found for this user.
        </div>
      )}
    </main>
  );
}

export default DashboardTweets;
