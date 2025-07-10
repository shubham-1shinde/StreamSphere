import VideoCard from "../components/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {

  const [videos, setVideos] = useState([]);
   
    const navigate = useNavigate();
    useEffect(() => {
    let isMounted = true;                    // guard against setting state after unmount

    const fetchVideos = async () => {
      try {
        const res =  axios.get("/v1/").then((response) => {
          if (isMounted) setVideos(response.data.data); 
          console.log("Fetched videos:", response.data.data);
        });     // update state only if still mounted
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();

    return () => {
      isMounted = false;                     // cleanup
    };
  }, []);    

  return (
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
  );
};

export default Home;
