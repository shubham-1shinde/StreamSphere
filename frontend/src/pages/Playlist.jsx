import React, { useEffect, useState } from 'react';
import PlaylistCard from '../components/PlaylistCard';
import {useSelector } from 'react-redux'
import axios from 'axios';
import Loading from '../components/Loading';

function Playlist() {
    const [userPlaylists, setUserPlaylists] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
          await axios.get(`/v1/playlist/user/${userData._id}`)
          .then((response) => {
            setUserPlaylists(response.data.data)
          })
          .finally(() => setLoading(false));
        }
        fetchPlaylists();
    },[])

  return !loading ? (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">All Playlists</h1>
      {userPlaylists.map((card, index) => (
        <PlaylistCard key={index} {...card} />
      ))}
    </div>
  ) : (<Loading />)
}

export default Playlist