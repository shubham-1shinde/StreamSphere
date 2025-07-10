import { Video, ZoomIn } from "lucide-react";   //  npm install lucide-react
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {useSelector} from 'react-redux' 
import Logout from './Logout'
import axios from "axios";
import { useState } from "react";

const Header = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [videos, setVideos] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/v1/videos/search", data).then((response) => {
        if(response.data.message === 'Searched video details fetched successfully') {
          navigate(`/videos/${response.data.data[0]._id}`)
        } else if (response.data.message === 'Searched channel details fetched successfully') {
          //const {username} = data  // asa jamna maay gunan direct pass karaych
          navigate(`/users/c/${response.data.data[0].username}`)
        } else if (response.data.message === 'Invalid Search'){
          alert("Invalid Search");
        }
      })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="h-14 w-full bg-[#0f0f0f] flex items-center px-4 gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <Video size={32} className="text-purple-500" />
        <span className="font-bold text-white text-2xl">STREAMIFY</span>
      </div>

      {/* search box */}
      <div className="flex-grow flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between w-full max-w-xl">
          <input
          type="text"
          placeholder="Search"
          {...register('data', {})}
          className="w-full max-w-xl bg-transparent border border-gray-600 rounded-sm px-4 py-1.5
           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <button type="submit" className="border border-gray-600 text-white">
            <ZoomIn/>
          </button>
        </form>
        
      </div>

      {!authStatus && (
            <Link
            to="/users/login"
            className="px-4 py-1.5 border border-gray-500 rounded-sm text-white
             hover:bg-gray-800 transition-colors">
                Login
            </Link>
        )}
      <div className="flex items-center gap-2 shrink-0">
        
        {!authStatus && (
            <Link
            to="/users/signup"
            className="px-4 py-1.5 border border-gray-500 rounded-sm text-white font-semibold
             hover:bg-purple-600 hover:border-purple-600 transition-colors">
                Sign up
            </Link>
        )}
        
        {authStatus && (
            <div className="px-4 py-1.5 border border-gray-500 rounded-sm text-white
                     hover:bg-gray-800 transition-colors">
                <Logout />
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
