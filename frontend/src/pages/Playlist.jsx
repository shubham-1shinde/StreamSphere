import React, { useEffect, useState } from 'react';
import PlaylistCard from '../components/PlaylistCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../components/Loading';

function Playlist() {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/v1/playlist/user/${userData._id}`)
        .then((response) => {
          setUserPlaylists(response.data.data);
        })
        .finally(() => setLoading(false));
    };
    fetchPlaylists();
  }, []);

  return !loading ? (
    <main className="min-h-screen max-w-8xl ml-60 p-6 text-white bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6]">
      <div className="backdrop-blur-md bg-black/30 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          🎶 Your Playlists
        </h1>

        <div className="space-y-4">
          {userPlaylists.length > 0 ? (
            userPlaylists.map((card, index) => (
              <PlaylistCard key={index} {...card} />
            ))
          ) : (
            <p className="text-gray-300 text-lg text-center">
              No playlists yet. Start creating your first playlist!
            </p>
          )}
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default Playlist;
