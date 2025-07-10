import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react";

const chats = [
  {
    name: "Me ✨❤️ (You)",
    message: "✔✔ 110687",
    time: "02-07-2025",
    isPinned: true,
    avatar: "https://i.pravatar.cc/40?u=me",
  },
  {
    name: "Mahesh Mama ❤️⚡",
    message: "Br br",
    time: "21:32",
    avatar: "https://i.pravatar.cc/40?u=mahesh",
  },
  {
    name: "Ajay💥",
    message: "Changle sang",
    time: "21:28",
    avatar: "https://i.pravatar.cc/40?u=ajay",
  },
  {
    name: "Careasa Web Development Team",
    message: "Soham: Join in!!",
    time: "21:02",
  },
  {
    name: "+91 90222 98275",
    message: "✔✔ Sir, I am in nanded so can my friend...",
    time: "20:57",
  },
  
];

const Chats = () => {

  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchChatSidebarList = async () => {
      await axios.get('/v1/messages/').then((response) => {
        setChatList(response.data.data)
        console.log('Chat sidebar list fetched', response.data.data)
      })
    }
    fetchChatSidebarList();
  },[])

  return (
    <div className="flex">
        <aside className="w-[370px] bg-[#111b21] h-screen text-white border-r border-gray-700 overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-700 text-lg font-bold">
          Chats
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full px-3 py-2 bg-[#202c33] text-sm text-white rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Chat List */}
        <div>
          {chatList.map((chat, index) => (
            <div
              key={index}
              className=""
            >
              <button 
              className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#2a3942] cursor-pointer border-b border-[#202c33]"
              onClick={() => {
                navigate(`/chats/message/${chat.username}`)
              }}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm">
                    👤
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="font-medium truncate">{chat.fullName}</span>
                  <span className="text-xs text-gray-400"></span>
                </div>
                <p className="text-sm text-gray-400 truncate"></p>
              </div>
              </button>
              
            </div>
          ))}
        </div>
        </aside>

        <div className="w-full h-full"> <Outlet/> </div>
    </div>
    
    
  );
};

export default Chats;
