import Dashboard from './Dashboard'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TweetCard from '../components/TweetCard';

function DashboardTweets() {
  const {username} = useParams();
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        const fetchTweets = async () => {
            const res = await axios.get(`/v1/tweets/users/${username}`).then((response) => {
                console.log('res is:',response.data.data)
                setTweets(response.data.data)
            })
        }
        fetchTweets();
    },[])
  return (
    <main className="p-6 w-full bg-[#0f0f0f] min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tweets.map((tweet, index) => (
            <div>
              <TweetCard key={index} {...tweet} />
            </div>
        ))}
      </div>
    </main>

  )
}

export default DashboardTweets