import { Video, Search } from "lucide-react"; // replaced ZoomIn for a cleaner icon
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const { register, handleSubmit } = useForm();
  const [videos, setVideos] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/v1/videos/search", data);
      const message = response.data.message;
      if (message === "Searched video details fetched successfully") {
        navigate(`/videos/${response.data.data[0]._id}`);
      } else if (message === "Searched channel details fetched successfully") {
        navigate(`/users/c/${response.data.data[0].username}`);
      } else if (message === "Invalid Search") {
        alert("Invalid Search");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-6 shadow-lg bg-gradient-to-r from-indigo-600/80 via-purple-600/70 to-pink-500/70 backdrop-blur-xl border-b border-white/20">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="p-2 bg-white/20 rounded-full shadow-md">
          <Video size={26} className="text-white" />
        </div>
        <span className="font-extrabold text-white text-2xl tracking-wider drop-shadow">
          Streamify
        </span>
      </div>

      {/* Search Box */}
      <div className="flex-grow flex justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full max-w-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search videos or channels..."
            {...register("data", {})}
            className="w-full px-4 py-2 pr-10 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/30 transition duration-200"
          />
          <button
            type="submit"
            className="absolute right-2 text-white hover:text-pink-300 transition"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3 shrink-0">
        {!authStatus && (
          <Link
            to="/users/login"
            className="px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.03] transition-all duration-200"
          >
            Login
          </Link>
        )}
        {!authStatus && (
          <Link
            to="/users/register"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-sm font-semibold hover:opacity-90 hover:scale-[1.03] transition-all duration-200 shadow-md"
          >
            Sign Up
          </Link>
        )}
        {authStatus && (
          <div className="px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.03] transition-all duration-200">
            <Logout />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
