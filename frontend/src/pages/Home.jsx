import VideoCard from "../components/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/v1/`)
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
    <main className="min-h-screen max-w-8xl bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f0f0f] ml-60 px-8 py-8 text-white transition-all duration-300">

      {/* Header */}
      <div className="flex flex-col w-3xl sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl w-full font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md">
          Explore Streamify
        </h1>
        <p className="text-gray-400 w-full mt-2 sm:mt-0">
          Dive into trending content across videos, tweets & chats.
        </p>
      </div>

      {/* Grid of Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => navigate(`/videos/${video._id}`)}
            className="group transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] rounded-2xl overflow-hidden"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-purple-400/40 transition-all duration-300">
              <VideoCard {...video} />
            </div>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <p className="text-lg">No videos found. Try uploading some!</p>
        </div>
      )}
    </main>
  ) : (
    <Loading />
  );
};

export default Home;
