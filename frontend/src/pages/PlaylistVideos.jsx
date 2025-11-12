import VideoCard from "../components/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function PlaylistVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playlistId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        await axios
          .get(`/v1/playlist/g/${playlistId}`)
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
  }, [playlistId]);

  return !loading ? (
    <main className="min-h-screen w-full p-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] text-white transition-all duration-500">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-md">
        Playlist Videos
      </h1>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <button
              key={video._id}
              onClick={() => navigate(`/videos/${video._id}`)}
              className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <VideoCard {...video} />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 mt-20">
          <p className="text-lg">No videos found in this playlist 📂</p>
        </div>
      )}
    </main>
  ) : (
    <Loading />
  );
}

export default PlaylistVideos;
