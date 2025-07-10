import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { FaRegComment, FaRetweet, FaHeart, FaChartBar, FaBookmark, FaShare } from 'react-icons/fa';

function TweetCard({_id, content, fullName, username, avatar, createdAt},) {
    const tweetId = _id;
    const [isTweetLiked, setIsTweetLiked] = useState(false);
    const [totalTweetLikes, setTotalTweetLikes] = useState(0);
  return (
    <div className="flex space-x-3 bg-black text-white p-4 border-b border-gray-700">
      <img
        src={avatar} 
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-1 text-sm">
          <span className="font-bold"> {fullName} </span>
          <span className="text-gray-400">@{username} · {createdAt}</span>
        </div>
        <p className="mt-1 text-lg">
          {content}
        </p>
        <div className="flex justify-between text-gray-500 mt-3 text-sm">
          <div className="flex items-center space-x-1"> 
          {
            <button onClick={async () => {
                const res = await axios.post(`/v1/likes/toggle/t/${tweetId}`)
                if(res.data.message === "Like added successfully on tweet") {
                    setIsTweetLiked(true)
                    const resp = await axios.get(`/v1/likes/tweets/${tweetId}`)
                    console.log('resp is:',resp.data.data)
                    setTotalTweetLikes(resp.data.data)
                } else {
                    setIsTweetLiked(false)
                    const resp = await axios.get(`/v1/likes/tweets/${tweetId}`)
                    console.log('resp is:',resp.data.data)
                    setTotalTweetLikes(resp.data.data)
                }
                
            }}>
            {isTweetLiked === true ? (
               <div className="flex justify-center items-center gap-4"><FaHeart className='text-pink-600'/> <p>{totalTweetLikes}</p></div> ) : (<div className="flex justify-center items-center gap-4"><FaHeart/> <p>{totalTweetLikes}</p></div>)}   

            </button>
          }
          </div>
          <div className="flex items-center space-x-1"><FaRegComment /> <span>7K</span></div>
          <div className="flex items-center space-x-1"><FaChartBar /> <span>7.9M</span></div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
