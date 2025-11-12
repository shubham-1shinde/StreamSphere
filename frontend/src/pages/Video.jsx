import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Trash, Heart } from 'lucide-react';
import SubscribeBtn from "../components/SubscribeBtn.jsx";
import Loading from "../components/Loading.jsx";

const Video = () => {
  const navigate = useNavigate();
  const hasViewed = useRef(false);
  const [video, setVideo] = useState([]);
  const [upNextVideos, setUpNextVideos] = useState([]);
  const [addComment, setaddComment] = useState("");
  const [deleteComment, setdeleteComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isVideoLiked, setisVideoLiked] = useState(false);
  const [videoTotalLikes, setVideoTotalLikes] = useState(false);
  const [toggleLike, setToggleLike] = useState([]);
  const { videoId } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    let isMounted = true;

    const fetchVideo = async () => {
      try {
        await axios.get(`/v1/videos/${videoId}`)
          .then((response) => {
            if (isMounted) setVideo(response.data.data);
          })
          .finally(() => setLoading(false));

        await axios.post(`/v1/users/a/${videoId}`);
      } catch (err) {
        console.error("Failed to fetch video:", err);
      }
    };

    const fetchUpNextVideo = async () => {
      try {
        await axios.get(`/v1/videos/upnext/${videoId}`)
          .then((response) => {
            if (isMounted) setUpNextVideos(response.data.data);
          });
      } catch (err) {
        console.error("Failed to fetch upnext videos:", err);
      }
    };

    const fetchComment = async () => {
      try {
        await axios.get(`/v1/comments/${videoId}`)
          .then((response) => {
            if (isMounted) setComments(response.data.data);
          });
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    const fetchLikes = async () => {
      try {
        const likes = await axios.get(`/v1/likes/videos/${videoId}`);
        const isLiked = await axios.get(`/v1/likes/isliked/${videoId}`);
        setVideoTotalLikes(likes.data.data);
        setisVideoLiked(isLiked.data.data);
      } catch (err) {
        console.error("Failed to fetch likes:", err);
      }
    };

    fetchVideo();
    fetchUpNextVideo();
    fetchComment();
    fetchLikes();

    return () => {
      isMounted = false;
    };
  }, [addComment, deleteComment, toggleLike]);

  useEffect(() => {
    const addView = async () => {
      if (!hasViewed.current) {
        try {
          await axios.get(`/v1/videos/a/${videoId}`);
          hasViewed.current = true;
        } catch (err) {
          console.error("Failed to add view:", err);
        }
      }
    };
    addView();
  }, [videoId]);

  const onSubmit = async (data) => {
    const res = await axios.post(`/v1/comments/${videoId}`, data);
    setaddComment(res.data.data);
  };

  const addToPlaylistClicked = async () => {
    await axios.get(`/v1/playlist/user/${userData._id}`)
      .then((response) => {
        setUserPlaylists(response.data.data);
      });
  };

  return !loading ? (
    <div className="flex flex-col lg:flex-row bg-black text-white min-h-screen max-w-8xl mx-auto ml-60">
      {video.map((v, i) => (
        <div key={i} className="flex-1 p-4">
          <div className="aspect-video bg-gray-800 w-full rounded-lg overflow-hidden">
            <iframe
              src={v.videoFile}
              className="w-full h-full"
              title={v.title}
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="mt-4 text-xl font-semibold">{v.title}</h2>
          <p className="text-sm text-gray-400">{v.views} · {v.createdAt}</p>

          <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-3"
                onClick={() => navigate(`/users/c/${v.username}`)}
              >
                <img
                  src={v.avatar}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <p className="font-semibold">{v.username}</p>
                  <p className="text-sm text-gray-400">2.02M subscribers</p>
                </div>
              </button>
              <SubscribeBtn videoId={videoId} />
            </div>

            <div className="flex items-center gap-4">
              <button
                className="bg-gray-800 px-4 py-1 rounded-lg"
                onClick={async () => {
                  const res = await axios.post(`/v1/likes/toggle/v/${videoId}`);
                  setToggleLike(res.data.data);
                }}
              >
                {isVideoLiked ? (
                  <div className="flex gap-4">
                    <p>{videoTotalLikes}</p>
                    <p>Liked</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <p>{videoTotalLikes}</p>
                    <p>Like</p>
                  </div>
                )}
              </button>
              <button className="bg-gray-800 px-4 py-1 rounded-lg">Share</button>
              <button className="bg-gray-800 px-4 py-1 rounded-lg">Download</button>
              <button
                className="bg-gray-800 px-4 py-1 rounded-lg"
                onClick={addToPlaylistClicked}
              >
                Add to Playlist
              </button>
              {userPlaylists && (
                <div>
                  {userPlaylists.map((p, i) => (
                    <button
                      key={i}
                      onClick={async () => {
                        await axios.patch(`/v1/playlist/add/${videoId}/${p._id}`)
                          .then((response) => console.log(response.data.data));
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 bg-gray-900 p-4 rounded-lg text-sm">
            {v.description}
          </div>

          <div className="mt-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>

            <div className="flex items-start gap-3 mb-4 justify-between">
              <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-center w-full gap-4">
                <input
                  type="text"
                  {...register('content', {})}
                  className="flex-1 p-2 rounded-lg bg-gray-800 text-white"
                  placeholder="Add a comment..."
                />
                <button type="submit" className="w-24 p-2 rounded-lg bg-gray-800 text-white">
                  Comment
                </button>
              </form>
            </div>

            <div className="space-y-4 w-full">
              {comments.map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg">
                  <p className="text-sm">{c.content}</p>
                  <div className="flex gap-2 items-center">
                    <button
                      className="bg-gray-700 px-3 py-1 rounded-lg flex gap-2 items-center"
                      onClick={async () => {
                        try {
                          const res = await axios.post(`/v1/likes/toggle/c/${c._id}`);
                          const likeRes = await axios.get(`/v1/likes/comments/${c._id}`);
                          const updatedComments = [...comments];
                          updatedComments[i].likes = likeRes.data.data;
                          updatedComments[i].liked = res.data.message.includes("added");
                          setComments(updatedComments);
                        } catch (err) {
                          console.error("Error liking comment:", err);
                        }
                      }}
                    >
                      <p>{c.likes || 0}</p>
                      <Heart color={c.liked ? "red" : "white"} />
                    </button>

                    {c.owner === userData._id && (
                      <button
                        onClick={async () => {
                          const res = await axios.delete(`/v1/comments/c/${c._id}`);
                          setdeleteComment(res);
                        }}
                      >
                        <Trash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <aside className="w-full lg:w-96 bg-gray-900 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3">Up Next</h3>
        {upNextVideos.map((video, index) => (
          <div key={index} className="flex mb-4 gap-3 cursor-pointer">
            <div className="w-32 h-20 bg-gray-700 rounded-md">
              <img
                src={video.thumbnail}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{video.title}</p>
              <p className="text-xs text-gray-400">
                {video.username} · {video.duration}
              </p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  ) : (
    <Loading />
  );
};

export default Video;
