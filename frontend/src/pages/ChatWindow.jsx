import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ChatWindow = () => {
  const bottomRef = useRef(null);
  const { username } = useParams();
  const [sendedMessage, setSendedMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [receiverData, setReceiverData] = useState();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchChatWindow = async () => {
      try {
        const res = await axios.get(`/v1/messages/${username}`);
        setMessages(res.data.data);
        console.log("Fetched messages:", res.data.data);
      } catch (error) {
        console.error("Failed to load chat window:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`/v1/messages/g/${username}`);
        setReceiverData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch receiver data:", error);
      }
    };

    fetchChatWindow();
    fetchReceiver();
  }, [username, sendedMessage]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`/v1/messages/${username}`, data);
      setSendedMessage(res.data.data);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return !loading ? (
    <section className="flex-1 flex flex-col h-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] text-white backdrop-blur-lg shadow-inner">
      {/* Chat Header */}
      {receiverData && (
        <div className="h-16 px-6 flex items-center justify-between border-b border-gray-800 bg-black/40 backdrop-blur-md shadow-md">
          <div className="flex items-center gap-3">
            <img
              src={receiverData.avatar}
              alt={receiverData.fullName}
              className="w-10 h-10 rounded-full border border-gray-700 shadow-lg"
            />
            <div>
              <div className="font-semibold text-lg">{receiverData.fullName}</div>
              <p className="text-xs text-gray-400">Online now</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((msg, index) => {
          const isSender = msg.receiver.username === username;
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 text-sm shadow-md backdrop-blur-md ${
                  isSender
                    ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white"
                    : "bg-white/10 text-gray-200"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                <div className="text-right text-[10px] text-gray-300 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <div className="px-6 py-3 bg-black/50 border-t border-gray-800 backdrop-blur-lg flex items-center gap-3">
        <form
          className="flex w-full items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Type a message..."
            {...register("content", {})}
            className="flex-1 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform shadow-md"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default ChatWindow;
