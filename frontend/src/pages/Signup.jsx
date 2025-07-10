import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import axios from 'axios';
//import { login } from '../store/authSlice'

function Signup() {

   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const onSubmit = async(data) => {
    //console.log('Sign Up:', data);

    //localStorage.setItem('status', 'true')
    //dispatch(login());


    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("avatar", data.avatar[0]);

    //console.log(data);
    const response = await axios.post('/v1/users/register', formData)

    if (response){
        console.log(response);
        console.log(response.data);
        navigate('/users/login');
    }


  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Enter your name"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

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
            <label className="text-sm">Username</label>
            <input
              type="text"
              {...register('username', {
                required: 'username is required',
              })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
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

          <div>
            <label className="text-sm">Avatar</label>
            <input
              type="file"
              accept='.jpg, .jpeg, .png'
              {...register('avatar', { required: 'avatar is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Upload your avatar"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Cover Image</label>
            <input
              type="file"
              accept='.jpg, .jpeg, .png'
              {...register('coverImage', { required: 'coverImage is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Upload your Cover Image"
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/users/login" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup