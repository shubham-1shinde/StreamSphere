import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login, logout} from "./store/authSlice"
import Header from "./header/Header.jsx"
import Footer from "./footer/Footer.jsx"
import Sidebar from "./sidebar/Sidebar.jsx"
import { Outlet } from 'react-router-dom'
import axios from "axios";
import Loading from './components/Loading.jsx'


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect( () => {
    let isMounted = true;   
    const fun = async () => {
      await axios.get("/v1/users/current-user")
      .then((response) => {
        const userData = response.data.data
        if (userData) {
            dispatch(login({userData}));
        } else {
            dispatch(logout());
        }
      })
      .finally(() => setLoading(false))}

    fun();

    return () => {
      isMounted = false;                     
    };
    
  }, [])
  

  return !loading ? (
   <>
    <div className='w-full flex flex-col'>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
    </>
  ) : (<Loading/>)
}

export default App
//await axios.post(`/v1/playlists/add/${v._id}`, {playlistId: v._id, videoId: v._id});