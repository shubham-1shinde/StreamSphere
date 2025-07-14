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
    let isMounted = true;                    // guard against setting state after unmount

    const fetchVideos = async () => {
      try {
        axios.get("/v1/users/history").then((response) => {
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
      isMounted = false;                     // cleanup
    };
  }, []);    

  return !loading ? (
    <main className="p-6 w-full bg-[#0f0f0f] min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
            <button onClick={() => {
              const videoId = video._id;
              navigate(`/videos/${videoId}`)
            }} >
              <VideoCard key={index} {...video} />
            </button>
        ))}
      </div>
    </main>
  ) : (<Loading />)
};

export default WatchHistory;
