import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { Link, useNavigate } from "react-router-dom";

function MyVideos() {
  const [videos, setVideos] = useState([]);
   
  const navigate = useNavigate();
    useEffect(() => {
    let isMounted = true;                    // guard against setting state after unmount

    const fetchVideos = async () => {
      try {
        const res =  axios.get("/v1/videos/").then((response) => {
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
      <div className="flex justify-center items-center h-auto mt-2 mb-4 w-full text-white">
        <Link to='/videos/upload-video' className="text-xl font-bold">
         + Add Video
        </Link>
      </div>
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
}

export default MyVideos;
