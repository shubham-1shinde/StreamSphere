import axios from 'axios'
import React, { useState, useEffect } from 'react'
import VideoCard from '../components/VideoCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function LikedVideos() {
    const [likedVideos, setLikedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
    let isMounted = true;                    

    const fetchVideos = async () => {
      try {
        await axios.get("/v1/likes/videos").then((response) => {
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
    <main className="p-6 w-full bg-[#0f0f0f] min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {likedVideos.map((video, index) => (
            <button onClick={() => {
              const videoId = video._id;
              console.log(videoId)
              navigate(`/videos/${videoId}`)
            }} >
              <VideoCard key={index} {...video} />
            </button>
        ))}
      </div>
    </main>
  ) : (<Loading/>)
}

export default LikedVideos