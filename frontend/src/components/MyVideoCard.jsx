import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyVideoCard = ({ _id, title, views, timeAgo, username, duration, thumbnail, isPublished }) => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIsPublishedStatus = async () => {
      setEnabled(isPublished);
    };
    fetchIsPublishedStatus();
  }, [isPublished]);

  return (
    <div className="max-w-8xl mx-auto ml-60 bg-black rounded overflow-hidden text-white w-full h-full flex flex-col">
      <button
        className="rounded overflow-hidden text-white relative bg-gray-800 h-40 w-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          navigate(`/videos/${_id}`);
        }}
      >
        <div className="relative bg-gray-800 h-40 flex items-center justify-center">
          <span className="absolute bottom-1 right-1 text-xs bg-black px-1">{duration}</span>
          <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
        </div>
      </button>

      <div className="flex w-full justify-between pl-4 pr-4 items-center">
        <div className="p-2">
          <h2 className="font-semibold text-sm">{title}</h2>
          <p className="text-xs text-gray-400">{views} Views · {timeAgo}</p>
          <p className="text-xs text-gray-300">{username}</p>
        </div>
        <div>
          <button
            onClick={async () => {
              const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/v1/videos/toggle/publish/${_id}`);
              setEnabled(response.data.data.isPublished);
            }}
            className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 
              ${enabled ? "bg-blue-600" : "bg-blue-300"}`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300
                ${enabled ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyVideoCard;
