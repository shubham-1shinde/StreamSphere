import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TweetCard from "../components/TweetCard";
import Loading from "../components/Loading";

function Tweet() {
  const [tweet, setTweet] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/v1/tweets/", data);
      setTweet(res.data.data);
      reset(); // clear input after posting
    } catch (err) {
      console.error("Tweet not submitted", err);
    }
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("/v1/tweets/");
        setTweets(response.data.data);
      } catch (error) {
        console.error("Error fetching tweets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, [tweet]);

  return !loading ? (
    <main className="min-h-screen max-w-8xl ml-60 p-6 text-white bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] font-sans">
      <div className="backdrop-blur-md bg-black/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex sticky top-0 z-10 border-b border-gray-700 backdrop-blur-md bg-black/30">
          <NavLink
            to="/tweets/"
            className={({ isActive }) =>
              `flex-1 text-center py-3 transition ${
                isActive
                  ? "font-bold border-b-4 border-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-800/40"
              }`
            }
          >
            For You
          </NavLink>
          <NavLink
            to="/tweets/following"
            className={({ isActive }) =>
              `flex-1 text-center py-3 transition ${
                isActive
                  ? "font-bold border-b-4 border-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-800/40"
              }`
            }
          >
            Following
          </NavLink>
        </div>

        {/* Tweet Input */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between p-4 border-b border-gray-700"
        >
          <input
            type="text"
            placeholder="What's happening?"
            {...register("content", { required: "Tweet is required" })}
            className="flex-1 px-4 py-2 bg-black/40 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Post
          </button>
        </form>

        {/* Tweets Feed */}
        <div className="divide-y divide-gray-800">
          {tweets.length > 0 ? (
            tweets.map((tweet, index) => (
              <TweetCard key={index} {...tweet} />
            ))
          ) : (
            <p className="text-gray-300 text-center py-6">
              No tweets yet. Be the first to post! 📝
            </p>
          )}
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default Tweet;
