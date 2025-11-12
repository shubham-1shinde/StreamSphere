import VideoCard from "../components/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const WatchHistory = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        axios
          .get("/v1/users/history")
          .then((response) => {
            if (isMounted) setVideos(response.data.data);
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
    <main className="min-h-screen max-w-8xl ml-60 p-6 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f0f0f] text-white transition-all duration-300">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text text-center">
        Watch History
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
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
    </main>
  ) : (
    <Loading />
  );
};

export default WatchHistory;
