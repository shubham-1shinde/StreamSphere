import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard';

function DashboardVideos() {
    const {username} = useParams();
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/v1/videos/u/${username}`).then((response) => {
                console.log('res is:',response.data.data)
                setVideos(response.data.data)
            })
        }
        fetchVideos();
    },[])
  return (
    <main className="p-6 w-full bg-[#0f0f0f] min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
            <button onClick={() => {
              navigate(`/videos/${video._id}`)
            }} >
              <VideoCard key={index} {...video} />
            </button>
        ))}
      </div>
    </main>

  )
}

export default DashboardVideos