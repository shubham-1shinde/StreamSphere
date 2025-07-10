import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubscribeBtn from "../components/SubscribeBtn";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {

    const [profile, setprofile] = useState([]);
    const navigate = useNavigate();
    const {username} = useParams();
    useEffect(() => {

        let isMounted = true;    

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/v1/users/c/${username}`).then((response) => {
                    setprofile(response.data.data);
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile();

        return () => {
        isMounted = false;                     
      };

    },[])
  return (
    <div className="bg-black h-full w-full text-white">
    <section className="w-full mx-auto h-auto mb-20 text-white p-8">
        {profile.map((p,i) => (
            <div key={i} className="flex flex-col ">
                <div >
                    <img
                    src={p.coverImage}
                    className="h-40 w-full object-cover rounded-md"
                    />
                </div>

                <div className="flex gap-6 px-6 pt-24 pb-8 h-40 w-full">

                    <div className="h-32 w-32 rounded-full ">
                        <img
                        src={p.avatar}
                        className="h-32 w-32 rounded-full border-4 border-[#0f0f0f]  object-cover "
                        />
                    </div>
                    

                    <div className="flex-1 ">
                        <h1 className="text-3xl font-bold flex items-center">
                            {p.fullName}
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            {p.username} · {p.subscribersCount} &nbsp;subscribers · 14K&nbsp;videos
                        </p>
                    </div>

                    <div className="flex justify-between w-72">
                        <button className="self-start sm:self-center bg-white text-black font-semibold px-6     py-2 rounded-full hover:bg-gray-200 transition"
                        onClick={() => {
                            navigate(`/chats/message/${p.username}`)
                        }}>
                            Message
                        </button>
                        <SubscribeBtn username={p.username}/>
                    </div>

                </div>
            </div>
        ))}
      
    </section>
    <div className="">
        <div className="flex h-12 w-full">
            <div className="flex justify-center items-center w-1/2 text-xl font-bold">
                <button onClick={() => {
                    navigate(`/users/c/${username}`)
                }}>
                    Videos
                </button>
            </div>
            <div className="flex justify-center items-center w-1/2 text-xl font-bold">
                <button onClick={() => {
                    navigate(`/users/c/${username}/tweets`)
                }}>
                    Tweets
                </button>
            </div>
        </div>
        <Outlet/>
    </div>
    </div>
  );
}

export default Dashboard;
