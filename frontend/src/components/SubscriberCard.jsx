import React, { useState } from 'react';
import SubscribeBtn from './SubscribeBtn';
import { useNavigate } from 'react-router-dom';

function SubscriberCard({ avatar, username, fullName, }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-start space-x-4 bg-black text-white p-4 rounded-lg shadow-lg">
      <button className='flex items-start space-x-4 bg-black text-white p-4 rounded-lg shadow-lg'
      onClick={() => {
        navigate(`/users/c/${username}`)
      }}>
        <img src={avatar} className="w-16 h-16 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <p className="text-sm text-gray-400">{username} •  subscribers</p>
          <p className="text-sm mt-1"></p>
        </div>
      </button>
      
      <SubscribeBtn username={username}/>
    </div>
  );
}

export default SubscriberCard;
