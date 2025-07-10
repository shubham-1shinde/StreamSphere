import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadVideo() {

   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const onSubmit = async(data) => {

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("isPublished", data.isPublished);

    //console.log(data);
    const response = await axios.post('/v1/videos/', formData)

    if (response){
        console.log(response);
        console.log(response.data);
        navigate('/videos/');
    }


  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Add Video</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="text-sm">Title</label>
            <input
              type="text"
              {...register('title', { required: 'title is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Enter video title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-sm">Description</label>
            <input
              type="text"
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Enter your email"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="text-sm">Video File</label>
            <input
              type="file"
              accept='.mp4'
              {...register('videoFile', { required: 'Video File is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Upload your video"
            />
            {errors.videoFile && (
              <p className="text-red-500 text-sm">{errors.videoFile.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Thumbnail</label>
            <input
              type="file"
              accept='.jpg, .jpeg, .png'
              {...register('thumbnail', { required: 'Thumbnail is required' })}
              className="w-full px-4 py-2 border rounded-lg mt-1"
              placeholder="Upload your Thumbnail"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
          </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Publish Status</label>
                <select
                    {...register('isPublished', { required: 'Publish status is required' })}
                    className="w-full px-4 py-2 border rounded-lg mt-1"
                >
                    <option value="">-- Select Status --</option>
                    <option value="true">Publish</option>
                    <option value="false">Unpublish</option>
                </select>
                
                {errors.isPublished && (
                    <p className="text-red-500 text-sm mt-1">{errors.isPublished.message}</p>
                )}
            </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Upload
          </button>
        </form>

      </div>
    </div>
  )
}

export default UploadVideo