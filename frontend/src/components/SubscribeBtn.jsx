import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function SubscribeBtn({username, videoId}) {
    const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  return (
    <button className="self-start sm:self-center bg-white text-black font-semibold px-6     py-2 rounded-full hover:bg-gray-200 transition"
    onClick={async() => {
        if(username) {
            const res = await axios.post(`/v1/subscriptions/g/${username}`)
            if(res.data.message === "Subscribed to channel successfully") {
                const resp = await axios.get(`/v1/users/u/${username}`)
                console.log(res.data.message)
                setIsUserSubscribed(resp.data.data);
                console.log("isusersubscribed", resp.data.data);
            } else {
                const resp = await axios.get(`/v1/users/u/${username}`)
                console.log(res.data.message)
                setIsUserSubscribed(resp.data.data);
                console.log("isusersubscribed", resp.data.data);
            } 
        } else if(videoId) {
            const res = await axios.post(`/v1/subscriptions/c/${videoId}`)
                
            if(res.data.message === "Subscribed to channel successfully") {
                const resp = await axios.get(`/v1/users/g/${videoId}`)
                console.log(res.data.message)
                setIsUserSubscribed(resp.data.data);
                console.log("isusersubscribed", resp.data.data);
            } else {
                const resp = await axios.get(`/v1/users/g/${videoId}`)
                console.log(res.data.message)
                setIsUserSubscribed(resp.data.data);
                console.log("isusersubscribed", resp.data.data);
            } 
        }
    }}>
        {isUserSubscribed === true ? "Unsubscribe" : "Subscribe"}
    </button>
  )
}

export default SubscribeBtn