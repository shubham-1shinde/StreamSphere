import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";

function DashboardVideos() {
  const { username } = useParams();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/v1/videos/u/${username}`);
        setVideos(res.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [username]);

  return (
    <main className="max-w-8xl p-6 min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] text-white">
      <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Videos by @{username}
      </h1>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => navigate(`/videos/${video._id}`)}
              className="cursor-pointer rounded-2xl p-4 bg-black/40 border border-gray-800 shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] backdrop-blur-md transition-all"
            >
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-400 text-lg">
          No videos uploaded by this user.
        </div>
      )}
    </main>
  );
}

export default DashboardVideos;
