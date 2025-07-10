import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux' 
import axios from 'axios';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
    const logoutHandler = async () => {
        const res = await axios.post("/v1/users/logout", userData._id);
        console.log(res)
        dispatch(logout());
        localStorage.removeItem('status');
        console.log("logout successully");
        navigate("/users/login");
    }
  return (
    <button
    className=''
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout
