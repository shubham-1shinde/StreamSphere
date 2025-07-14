import React, { useEffect, useState } from 'react';
import SubscriberCard from '../components/SubscriberCard';
import axios from 'axios';
import Loading from '../components/Loading';

function Subscription() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
          axios.get("/v1/subscriptions/u/")
          .then((response) => {
            console.log("res",response.data.data);
            setSubscribers(response.data.data);
          })
          .finally(() => setLoading(false));
        }
        fetchSubscribers();
    },[])

  return !loading ? (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">All subscriptions</h1>
      {subscribers.map((card, index) => (
        <SubscriberCard key={index} {...card} />
      ))}
    </div>
  ) : (<Loading />)
}

export default Subscription;
