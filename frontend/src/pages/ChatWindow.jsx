import React, { useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";


const ChatWindow = () => {
  const bottomRef = useRef(null);
  const {username} = useParams();
  const [sendedmessage, setSendedmessage] = useState([]);
  const [messages, setmessages] = useState([]);
  const [receiverData, setReceiverData] = useState();
  const [loading, setLoading] = useState(true);
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  useEffect(() => {
    const fetchChatWindow = async () => {
      await axios.get(`/v1/messages/${username}`)
      .then((response) => {
      console.log('res is',response.data.data)
      setmessages(response.data.data)
      })
      .finally(() => setLoading(false));
    }
    fetchChatWindow();

    const fetchReceiver = async () => {
      await axios.get(`/v1/messages/g/${username}`).then((response) => {
        setReceiverData(response.data.data)
    })
    }
    fetchReceiver();
    


  }, [username, sendedmessage]);

  const onsubmit = async (data) => {
    await axios.post(`/v1/messages/${username}`,data).then((response) => {
      setSendedmessage(response.data.data)
    })
  }

  return !loading ? (
    <div className="flex-1 flex flex-col h-full w-full bg-gray-800">
      {receiverData && (
        <div className="h-16 px-4 flex items-center justify-between bg-[#202c33] text-white border-l border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={receiverData.avatar}
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm font-semibold">{receiverData.fullName}</div>
        </div>
      </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 text-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.receiver.username === username ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`rounded-lg px-3 py-2 max-w-xs shadow-md text-sm whitespace-pre-line ${
                msg.receiver.username === username === "me" ? "bg-[#005c4b]" : "bg-[#202c33]"
              }`}
            >
              {msg.content}
              <div className="text-right text-xs text-gray-300 mt-1">
                {msg.createdAt}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-[#202c33] border-t border-gray-700 relative bottom-0.5">
        <form className="flex justify-between gap-4" onSubmit={handleSubmit(onsubmit)}>
          <input
          type="text"
          placeholder="Type a message..."
          {...register("content",{})}
          className="w-full rounded-lg px-4 py-2 bg-[#2a3942] text-white text-sm focus:outline-none"
          />
          <button className="text-white bg-blue-500 w-20 rounded-2xl">
            Send
          </button>
        </form>
        
      </div>
    </div>
  ) : (<Loading/>)
};

export default ChatWindow;
