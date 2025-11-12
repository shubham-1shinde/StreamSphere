import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('fullName', data.fullName);
    formData.append('coverImage', data.coverImage[0]);
    formData.append('avatar', data.avatar[0]);

    try {
      const response = await axios.post('/v1/users/register', formData);
      if (response) {
        console.log(response.data);
        navigate('/users/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 px-4 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 space-y-8">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-lg">
          Create Account 🌟
        </h2>
        <p className="text-center text-white/80 text-sm">
          Join <span className="font-semibold">Streamify</span> and start connecting!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm text-white/90">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Name is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/30 transition"
              placeholder="Enter your name"
            />
            {errors.fullName && (
              <p className="text-red-300 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-white/90">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/30 transition"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="text-sm text-white/90">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-300 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-white/90">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="text-sm text-white/90">Avatar</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              {...register('avatar', { required: 'Avatar is required' })}
              className="w-full mt-1 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white hover:file:opacity-90 transition"
            />
            {errors.avatar && (
              <p className="text-red-300 text-sm mt-1">{errors.avatar.message}</p>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="text-sm text-white/90">Cover Image</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              {...register('coverImage', { required: 'Cover Image is required' })}
              className="w-full mt-1 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-indigo-500 file:to-blue-500 file:text-white hover:file:opacity-90 transition"
            />
            {errors.coverImage && (
              <p className="text-red-300 text-sm mt-1">{errors.coverImage.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold tracking-wide hover:scale-[1.02] hover:shadow-lg transition-transform duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-white/80">
          Already have an account?{' '}
          <Link
            to="/users/login"
            className="text-pink-300 hover:text-white font-medium transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
