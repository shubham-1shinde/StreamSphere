import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../store/authSlice';

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
    console.log('session is already active');
    return;
  }

  /* ---------- helpers ---------- */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDone, setLoginDone] = useState(false);

  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/users/login`, data);
      setLoginDone(true);
    } catch (err) {
      console.error(err);
      // TODO: surface a user-friendly error message
    }
  };

  /* ---------- post-login flow ---------- */
  useEffect(() => {
    if (!loginDone) return;

    const controller = new AbortController();

    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/users/current-user`, {
          signal: controller.signal,
        });

        const userData = data?.data;
        if (userData) {
          dispatch(login({ userData }));
          localStorage.setItem('status', 'true');
          navigate('/');
        } else {
          dispatch(logout());
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error(err);
      }
    };

    fetchCurrentUser();
    return () => controller.abort();
  }, [loginDone, dispatch, navigate]);

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-8">
      <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-white/20">
        <h2 className="text-4xl font-bold text-center text-white tracking-wide drop-shadow-lg">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/80 text-sm">
          Sign in to continue to <span className="font-semibold">Streamify</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm text-white/90">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/30 transition"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-white/90">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/30 transition"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold tracking-wide hover:scale-[1.02] hover:shadow-lg transition-transform duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-white/80">
          Don't have an account?{' '}
          <Link
            to="/users/register"
            className="text-pink-300 hover:text-white font-medium transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
