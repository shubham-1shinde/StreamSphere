import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { Link, useNavigate } from "react-router-dom";
import MyVideoCard from "../components/MyVideoCard";
import Loading from "../components/Loading";

function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/videos/`)
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
    return () => { isMounted = false; };
  }, []);

  return !loading ? (
    <main className="min-h-screen max-w-8xl bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f0f0f] text-white ml-60 px-6 py-8 flex flex-col items-center">
      
      {/* Content container with max width */}
      <div className="w-full max-w-8xl">
        
        {/* Header / Add Video Button */}
        <div className="flex justify-center items-center h-auto mt-2 mb-6">
          <Link 
            to="/videos/upload-video"
            className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-200"
          >
            + Add Video
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <MyVideoCard key={index} {...video} />
          ))}
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default MyVideos;

