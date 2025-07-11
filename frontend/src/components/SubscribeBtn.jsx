import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function SubscribeBtn({username, videoId}) {
    const [isUserSubscribed, setIsUserSubscribed] = useState(false);
    const [subscribed, setSubscribed] = useState([]);
    useEffect(() => {
        const fetchISSubscriptionStatus = async () => {
            if (username) {
                const resp = await axios.get(`/v1/users/u/${username}`)
                setIsUserSubscribed(resp.data.data);
            } else if (videoId) {
                const resp = await axios.get(`/v1/users/g/${videoId}`)
                setIsUserSubscribed(resp.data.data);
            } 
        }
        fetchISSubscriptionStatus();
    },[subscribed])
    
  return (
    <button className="self-start sm:self-center bg-white text-black font-semibold px-6     py-2 rounded-full hover:bg-gray-200 transition"
    onClick={async() => {
        if(username) {
            const res = await axios.post(`/v1/subscriptions/g/${username}`)
            setSubscribed(res)
        } else if(videoId) {
            const res = await axios.post(`/v1/subscriptions/c/${videoId}`)
            setSubscribed(res)
        }
    }}>
        {isUserSubscribed === true ? "Unsubscribe" : "Subscribe"}
    </button>
  )
}

export default SubscribeBtn