import axios from "axios";
import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/v1/likes/videos`)
          .then((response) => {
            if (isMounted) setLikedVideos(response.data.data);
            console.log("Fetched videos:", response.data.data);
          })
          .finally(() => setLoading(false));
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return !loading ? (
    <main className="min-h-screen max-w-8xl bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f0f0f] text-white px-6 py-8 ml-60 flex flex-col items-center transition-all duration-300">
      
      {/* Container with max width */}
      <div className="w-full max-w-8xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text text-center">
          Liked Videos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedVideos.map((video, index) => (
            <button
              key={index}
              onClick={() => {
                const videoId = video._id;
                navigate(`/videos/${videoId}`);
              }}
              className="transform hover:scale-[1.02] transition-transform duration-200"
            >
              <VideoCard {...video} />
            </button>
          ))}
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default LikedVideos;
