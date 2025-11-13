import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Chats = () => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatSidebarList = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/messages/`);
        setChatList(res.data.data);
        console.log("Chat sidebar list fetched", res.data.data);
      } catch (err) {
        console.error("Failed to fetch chat list", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChatSidebarList();
  }, []);

  return !loading ? (
    <main className="min-h-screen max-w-8xl ml-60 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-[370px] backdrop-blur-lg bg-black/40 border-r border-gray-800 h-screen overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-700 text-xl font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md">
          💬 Chats
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-gray-800">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full px-4 py-2 bg-black/40 border border-gray-700 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chat List */}
        <div className="divide-y divide-gray-800">
          {chatList.length > 0 ? (
            chatList.map((chat, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 hover:scale-[1.02]"
                onClick={() => navigate(`/chats/message/${chat.username}`)}
              >
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900 flex-shrink-0 shadow-md">
                  {chat.avatar ? (
                    <img
                      src={chat.avatar}
                      alt={chat.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                      👤
                    </div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">
                      {chat.fullName}
                    </span>
                    <span className="text-xs text-gray-400">🟢</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {chat.lastMessage || "Start chatting..."}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No chats yet. Start a conversation! 💫
            </p>
          )}
        </div>
      </aside>

      {/* Chat Content */}
      <section className="flex-1 backdrop-blur-xl bg-black/30 h-screen overflow-hidden">
        <Outlet />
      </section>
    </main>
  ) : (
    <Loading />
  );
};

export default Chats;
