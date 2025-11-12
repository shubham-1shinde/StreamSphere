import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/users/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-16 h-16">
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-md animate-pulse"></div>
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin relative z-10"></div>
      </div>
    </div> : <>{children}</>
}
 