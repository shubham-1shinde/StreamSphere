import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../components/ToastNotification.jsx"
import { Trash, ArrowUpToLine, Heart,} from 'lucide-react';
import SubscribeBtn from "../components/SubscribeBtn.jsx";
const Video = () => {

// pending clear foem after adding comment
// and update comment
    const navigate = useNavigate();
    const hasViewed = useRef(false)
    const [video, setVideo] = useState([]);
    const [upNextVideos, setUpNextVideos] = useState([]);
    const [addComment, setaddComment] = useState("");
    const [deleteComment, setdeleteComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isVideoLiked, setisVideoLiked] = useState(false);
    const [isCommentLiked, setisCommentLiked] = useState(false);
    const [videoTotalLikes, setVideoTotalLikes] = useState(false);
    const [toggleLike, setToggleLike] = useState([]);
    const {videoId} = useParams();
    const userData = useSelector((state) => state.auth.userData);
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    useEffect(() => {
              
      let isMounted = true; 

      const fetchVideo = async () => {
        try {
          const res = await axios.get(`/v1/videos/${videoId}`).then((response) => {
            if (isMounted) setVideo(response.data.data); 
            console.log("Fetched videos:", response.data.data);
          }); 
          
          const resp = await axios.post(`/v1/users/a/${videoId}`)
          console.log("resp",resp)
        } catch (err) {
          console.error("Failed to fetch video:", err);
        }
      };
      fetchVideo();

      const fetchUpNextVideo = async () => {
        try {
          const res = await axios.get(`/v1/videos/upnext/${videoId}`).then((response) => {
            if (isMounted) setUpNextVideos(response.data.data); 
            console.log("Fetched upnext videos:", response.data.data);
          }); 
          
          /*const resp = await axios.post(`/v1/users/a/${videoId}`)
          console.log("resp",resp)*/
        } catch (err) {
          console.error("Failed to fetch video:", err);
        }
      };
      fetchUpNextVideo();

      const fetchComment = async () => {
        try {
          const res = await axios.get(`/v1/comments/${videoId}`).then((response) => {
            if (isMounted) setComments(response.data.data); 
          });     
        } catch (err) {
          console.error("Failed to fetch comment:", err);
        }
      };
      fetchComment();

      const fetchLikes = async () => {
        const likes = await axios.get(`/v1/likes/videos/${videoId}`);
        const isLiked = await axios.get(`/v1/likes/isliked/${videoId}`);
        console.log("totallikes",likes.data.data)
        setVideoTotalLikes(likes.data.data);
        console.log("isliked",isLiked.data.data)
        setisVideoLiked(isLiked.data.data);
      }
      fetchLikes();

      return () => {
        isMounted = false;                     
      };

    }, [addComment, deleteComment, toggleLike]);    

    useEffect(() => {

      let isMounted = true;                 

      const addView = async () => {
        if (!hasViewed.current) {
          try {
            const res = await axios.get(`/v1/videos/a/${videoId}`)
            hasViewed.current = true   
          } catch (err) {
            console.error("Failed to fetch views:", err);
          }
        }
        
      };
      addView();

      return () => {
        isMounted = false;                     
      };
    }, []);    


  const onSubmit = async(data) => {
    const res = await axios.post(`/v1/comments/${videoId}`, data);
    setaddComment(res.data.data)
    console.log("res is", res.data.data);

    console.log('Form submitted:', formData);
    setFormData(initialState); // 🔄 Clear the form
  }

  return (
    
    <div className="flex flex-col lg:flex-row bg-black text-white min-h-screen">
      {video.map ((v, i) => (<div key={i} className="flex-1 p-4">
          <div className="aspect-video bg-gray-800 w-full rounded-lg overflow-hidden">
          <iframe
            src={v.videoFile}
            className="w-full h-full"
            title={v.title}
            allowFullScreen
          ></iframe>
          </div>

        {/* Video Info */}
        <h2 className="mt-4 text-xl font-semibold">
          {v.title}
        </h2>
        <p className="text-sm text-gray-400">{v.views}· {v.createdAt}</p>

        {/* Channel & Actions */}
        <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-3" onClick={() => {
              navigate(`/users/c/${v.username}`)
            }}>
              <img
              src={v.avatar}
              className="w-10 h-10 object-cover rounded-full "
              />
              <div>
                <p className="font-semibold">{v.username}</p>
                <p className="text-sm text-gray-400">2.02M subscribers</p>
              </div>
            </button>
            <SubscribeBtn videoId={videoId}/>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-gray-800 px-4 py-1 rounded-lg"
            onClick={async() => {
                const res = await axios.post(`/v1/likes/toggle/v/${videoId}`)
                console.log("toggleLike",res.data.data)
                setToggleLike(res.data.data)
            }}
            >
              {isVideoLiked === true ? (
               <div className="flex gap-4"><p>{videoTotalLikes}</p> <p>Liked</p></div> ) : (<div className="flex gap-4"><p>{videoTotalLikes}</p> <p>Like</p></div>)}

            </button>
            <button className="bg-gray-800 px-4 py-1 rounded-lg">Share</button>
            <button className="bg-gray-800 px-4 py-1 rounded-lg">Download</button>
          </div>
        </div>
        {/* Description */}
        <div className="mt-4 bg-gray-900 p-4 rounded-lg text-sm">
          {v.description}
        </div>
        {/* Comments Section */}
        <div className="mt-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>

          {/* Comment Form */}
          <div className="flex items-start gap-3 mb-4 justify-between">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex justify-between items-center">
              <div className="w-96">
                <input
                  type="text"
                  {...register('content', {})}
                  className="w-full p-2 rounded-lg bg-gray-800 text-white resize-none"
                  placeholder="Add a comment..."
                />
              </div>
              <button type="submit" className="w-24 p-2 rounded-lg bg-gray-800 text-white ">
                Comment
              </button>
            </form>
          </div>

        <div className="space-y-4 w-full">
            {comments.map((c, i) => {

              
              return (
              <div key={i} className="flex gap-3 ">
                <div className="w-full flex justify-between items-center">
                    <p className="text-sm">{c.content}</p>
                    <div className="flex gap-2">
                      <div>
                        <button
                          className="bg-gray-800 px-4 py-1 rounded-lg"
                          onClick={async () => {
                            try {
                              const res = await axios.post(`/v1/likes/toggle/c/${c._id}`);
                              const likeRes = await axios.get(`/v1/likes/comments/${c._id}`);

                              const updatedComments = [...comments];
                              updatedComments[i].likes = likeRes.data.data;
                              updatedComments[i].liked = res.data.message === "Like added successfully on comment";

                              setComments(updatedComments);
                            } catch (err) {
                              console.error("Error liking comment:", err);
                            }
                          }}
                        >
                          <div className="flex gap-2 items-center">
                            <p>{c.likes || 0}</p>
                            <Heart color={c.liked ? "red" : "white"} />
                          </div>
                        </button>
                      </div>
                      {c.owner === userData._id ? (
                      (() => {
                          return (
                            <div>
                            <button onClick={async () => {
                              const res = await axios.delete(`/v1/comments/c/${c._id}`);
                              setdeleteComment(res)
                              console.log("comment deleted", res);
                              }}>
                              <Trash/>
                            </button>
                            </div>  
                        )
                      })()
                    ) : null}
                    </div>
                    
                </div>
              </div>
            )
            } )}
          </div>
          </div>
      </div>
        ))}
     
      
      
      

        

      {/* Suggestions Sidebar */}
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
              <p className="text-xs text-gray-400">{video.username} · {video.duration}</p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default Video;