import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import SubscribeBtn from "../components/SubscribeBtn";

function Dashboard() {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/v1/users/c/${username}`);
        if (isMounted) setProfile(res.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="min-h-screen max-w-8xl ml-60 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] text-white">
      <section className="max-w-8xl mx-auto mb-20 px-6 py-10">
        {profile.map((p, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-xl backdrop-blur-md border border-gray-800 bg-black/40"
          >
            {/* Cover Image */}
            <div className="relative">
              <img
                src={p.coverImage}
                alt="Cover"
                className="h-48 w-full object-cover"
              />
              <div className="absolute bottom-[-60px] left-10">
                <img
                  src={p.avatar}
                  alt={p.fullName}
                  className="h-32 w-32 rounded-full border-4 border-gray-900 shadow-xl object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-24 pb-8 px-10 flex flex-wrap justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">{p.fullName}</h1>
                <p className="text-sm text-gray-400 mt-1">
                  @{p.username} · {p.subscribersCount} subscribers · 14K videos
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-md"
                  onClick={() => navigate(`/chats/message/${p.username}`)}
                >
                  Message
                </button>
                <SubscribeBtn username={p.username} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-8xl mx-auto">
        <div className="flex border-b border-gray-700 bg-black/40 backdrop-blur-md rounded-t-lg overflow-hidden">
          <button
            onClick={() => navigate(`/users/c/${username}`)}
            className="flex-1 py-3 text-center font-semibold text-lg hover:bg-gray-900/40 transition-all"
          >
            Videos
          </button>
          <button
            onClick={() => navigate(`/users/c/${username}/tweets`)}
            className="flex-1 py-3 text-center font-semibold text-lg hover:bg-gray-900/40 transition-all"
          >
            Tweets
          </button>
        </div>

        {/* Nested content */}
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-b-lg shadow-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
