import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import TweetCard from "../components/TweetCard";
import Loading from "../components/Loading";

function Tweet () {
  const [tweet, setTweet] = useState([]);
  const [tweets, setTweets] = useState([[]]);
  const [loading, setLoading] = useState(true);

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
    try {
      const res = await axios.post("/v1/tweets/", data);
      setTweet(res.data.data)
    } catch (err) {
      console.error("tweet not submitted",err);
    }
  };

  useEffect(() => {
    const fetchTweets = async () => {
        try {
            await axios.get("/v1/tweets/")
            .then((response) => setTweets(response.data.data))
            .finally(() => setLoading(false));
            
        } catch (error) {
            
        }
    }
    fetchTweets();
  },[tweet])

  return !loading ? (
    <div className="min-h-screen w-full pl-5 pr-5 mx-auto bg-black text-white font-sans">
      <div className="flex sticky top-0 w-full z-10 bg-black">
        <NavLink 
        to="/tweets/"
        className={({isActive}) =>
            `flex justify-center items-center w-1/2 ${isActive ? "font-bold border-b-4 border-blue-500 text-white" : "text-gray-400 hover:bg-gray-800"}`
        }>
            <div className='h-8 w-80 flex justify-between items-center text-center'>
                <p>For You</p>
            </div>
        </NavLink>
        <NavLink 
        to="/tweets/following"
        className={({isActive}) =>
            `w-1/2 flex justify-center items-center ${isActive ? "font-bold border-b-4 border-blue-500 text-white" : "text-gray-400 hover:bg-gray-800"}`
        }>
            <div className='h-8 w-80 flex justify-between items-center text-center'>
                Following
            </div>
        </NavLink>
      </div>

      <div className="flex items-center justify-between p-4  border-b border-gray-700 w-full">
        <div className="flex w-full justify-between items-center">
          <form className="flex justify-between items-center" onSubmit={handleSubmit(onSubmit)}>
            <input
            type="text"
            placeholder="What's happening ?"
            {...register('content', { required: 'tweet is required' })}
              className="px-4 py-2 border rounded-lg mt-1"
            />
            <button type="submit" className="bg-blue-500 px-4 py-1 rounded-full font-semibold">
              Post
            </button>
          </form>
            
         
        </div>
      </div>

      {
        tweets.map((tweet, index) => (
            <div>
                <div>
                    <TweetCard key={index} {...tweet}/>
                </div>
            </div>
        ))
      }
      
    </div>
  ) : (<Loading/>)
}



export default Tweet;