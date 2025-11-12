import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlaylistCard({ _id, name, description }) {
  const navigate = useNavigate();
  const playlistId = _id;

  return (
    <div className="max-w-8xl mx-auto ml-60 flex items-start space-x-4 bg-black text-white p-4 rounded-lg shadow-lg">
      <button
        className="flex items-start space-x-4 bg-black text-white p-4 rounded-lg shadow-lg w-full text-left"
        onClick={() => {
          navigate(`/playlist/g/${playlistId}`);
        }}
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-400">{description}</p>
          <p className="text-sm mt-1"></p>
        </div>
      </button>
    </div>
  );
}

export default PlaylistCard;
