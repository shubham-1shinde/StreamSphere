import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import axios from 'axios';
import {useSelector} from 'react-redux' 
import { login } from '../store/authSlice'

function Signin() {
  /* ---------- form ---------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* ---------- auth redirect ---------- */
  const authStatus = useSelector((state) => state.auth.status);
  if (authStatus) {
    console.log("session is already active")
    return;
  };    // already signed in

  /* ---------- helpers ---------- */
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const [loginDone, setLoginDone] = useState(false);       // <- flag we watch

  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    try {
      await axios.post("/v1/users/login", data);           // JSON body
      setLoginDone(true);                                  // triggers useEffect
    } catch (err) {
      console.error(err);
      // TODO: surface a user‑friendly error message
    }
  };

  /* ---------- post‑login flow ---------- */
  useEffect(() => {
    if (!loginDone) return;                                // run only once

    const controller = new AbortController();

    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get("/v1/users/current-user", {
          signal: controller.signal,
        });

        const userData = data?.data;
        if (userData) {
          dispatch(login({ userData }));
          localStorage.setItem("status", "true");
          navigate("/");
        } else {
          dispatch(logout());
        }
      } catch (err) {
        if (axios.isCancel(err)) return;                   // aborted on unmount
        console.error(err);
      }
    };

    fetchCurrentUser();

    // abort request if component unmounts
    return () => controller.abort();
  }, [loginDone, dispatch, navigate]);
  
 
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              {...register('password', { required: 'password is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/users/register" className="text-blue-600 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signin
