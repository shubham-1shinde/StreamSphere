import React, { useEffect, useState } from 'react';
import SubscriberCard from '../components/SubscriberCard';
import axios from 'axios';
import Loading from '../components/Loading';

function Subscription() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/v1/subscriptions/u/`)
        .then((response) => {
          console.log("res", response.data.data);
          setSubscribers(response.data.data);
        })
        .finally(() => setLoading(false));
    };
    fetchSubscribers();
  }, []);

  return !loading ? (
    <main className="min-h-screen max-w-8xl ml-60 p-6 text-white bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6]">
      <div className="backdrop-blur-md bg-black/30 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          👥 Your Subscriptions
        </h1>

        <div className="space-y-4">
          {subscribers.length > 0 ? (
            subscribers.map((card, index) => (
              <SubscriberCard key={index} {...card} />
            ))
          ) : (
            <p className="text-gray-300 text-lg text-center">
              You haven’t subscribed to anyone yet.
            </p>
          )}
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default Subscription;
