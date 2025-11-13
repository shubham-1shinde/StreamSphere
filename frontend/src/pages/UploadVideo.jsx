import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UploadVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("isPublished", data.isPublished);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/videos/`, formData);
      if (response) {
        console.log("Upload success:", response.data);
        navigate("/videos/");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a40] to-[#3b82f6] px-4">
      <div className="max-w-md w-full bg-[#0f0f0f]/70 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-lg">
          Upload a Video
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-300">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 rounded-lg mt-1 bg-[#1f1f1f] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter video title"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg mt-1 bg-[#1f1f1f] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              placeholder="Write a short description..."
            ></textarea>
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Video File */}
          <div>
            <label className="text-sm text-gray-300">Video File (.mp4)</label>
            <input
              type="file"
              accept=".mp4"
              {...register("videoFile", { required: "Video file is required" })}
              className="w-full mt-1 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {errors.videoFile && (
              <p className="text-red-400 text-sm mt-1">
                {errors.videoFile.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="text-sm text-gray-300">
              Thumbnail (.jpg, .png)
            </label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              {...register("thumbnail", {
                required: "Thumbnail is required",
              })}
              className="w-full mt-1 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            {errors.thumbnail && (
              <p className="text-red-400 text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Publish Status */}
          <div>
            <label className="text-sm text-gray-300">Publish Status</label>
            <select
              {...register("isPublished", {
                required: "Publish status is required",
              })}
              className="w-full px-4 py-2 rounded-lg mt-1 bg-[#1f1f1f] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Select Status --</option>
              <option value="true">Publish</option>
              <option value="false">Unpublish</option>
            </select>
            {errors.isPublished && (
              <p className="text-red-400 text-sm mt-1">
                {errors.isPublished.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition font-semibold shadow-md hover:shadow-xl"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
