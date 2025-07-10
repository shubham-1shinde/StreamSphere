import React, { useEffect, useState } from 'react';
import SubscriberCard from '../components/SubscriberCard';
import axios from 'axios';

function Subscription() {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            const response = await axios.get("/v1/subscriptions/u/");
            console.log("res",response.data.data);
            setSubscribers(response.data.data);
        }
        fetchSubscribers();
    },[])

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">All subscriptions</h1>
      {subscribers.map((card, index) => (
        <SubscriberCard key={index} {...card} />
      ))}
    </div>
  );
}

export default Subscription;
