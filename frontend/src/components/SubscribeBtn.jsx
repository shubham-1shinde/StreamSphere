import React, { useState, useEffect } from "react";
import axios from "axios";

function SubscribeBtn({ username, videoId }) {
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        if (username) {
          const resp = await axios.get(`/v1/users/u/${username}`);
          setIsUserSubscribed(resp.data.data);
        } else if (videoId) {
          const resp = await axios.get(`/v1/users/g/${videoId}`);
          setIsUserSubscribed(resp.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [username, videoId]);

  const handleSubscribe = async () => {
    try {
      if (username) {
        await axios.post(`/v1/subscriptions/g/${username}`);
      } else if (videoId) {
        await axios.post(`/v1/subscriptions/c/${videoId}`);
      }
      // Toggle subscription state locally for instant feedback
      setIsUserSubscribed((prev) => !prev);
    } catch (error) {
      console.error("Failed to update subscription:", error);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="self-start sm:self-center bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition"
    >
      {isUserSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
}

export default SubscribeBtn;
