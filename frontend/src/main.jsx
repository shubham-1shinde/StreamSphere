import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  AuthLayout from './components/AuthLayout.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Home from './pages/Home.jsx'
import MyVideos from './pages/MyVideos.jsx'
import Video from './pages/Video.jsx'
import LikedVideos from './pages/LikedVideos.jsx'
import WatchHistory from './pages/WatchHistory.jsx'
import Subscription from './pages/Subscription.jsx'
import Tweet from './pages/Tweet.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardTweets from './pages/DashboardTweets.jsx'
import DashboardVideos from './pages/DashboardVideos.jsx'
import UploadVideo from './pages/UploadVideo.jsx'
import ChatSidebar from './pages/ChatSidebar.jsx'
import ChatWindow from './pages/ChatWindow.jsx'
import EmptyChat from './pages/EmptyChat.jsx'
import Playlist from './pages/Playlist.jsx'
import PlaylistVideos from './pages/PlaylistVideos.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        
        ),
      },
      {
        path: "/users/register",
        element: (
         <AuthLayout authentication={false}>
          <Signup />
         </AuthLayout>
        ),
      },
      {
        path: "/users/login",
        element: (
          <AuthLayout authentication={false}>
          <Signin />
         </AuthLayout>
        ),
      },
      {
        path: "/videos/",
        element: (
          <AuthLayout authentication={true}>
          <MyVideos />
         </AuthLayout>
        ),
      },
      {
        path: "/videos/upload-video",
        element: (
          <AuthLayout authentication={true}>
            <UploadVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/videos/:videoId",
        element: (
          <AuthLayout authentication={true}>
          <Video />
         </AuthLayout>
        ),
      },
      {
        path: "/likes/videos",
        element: (
          <AuthLayout authentication={true}>
          <LikedVideos />
         </AuthLayout>
        ),
      },
      {
        path: "/users/history",
        element: (
          <AuthLayout authentication={true}>
          <WatchHistory />
         </AuthLayout>
        ),
      },
      {
        path: "/subscriptions/u/",
        element: (
          <AuthLayout authentication={true}>
          <Subscription />
         </AuthLayout>
        ),
      },
      {
        path: "/tweets/",
        element: (
          <AuthLayout authentication={true}>
          <Tweet />
         </AuthLayout>
        ),
      },
      {
        path: "/playlist/",
        element: (
          <AuthLayout authentication={true}>
          <Playlist />
         </AuthLayout>
        ),
      },
      {
        path: "/playlist/g/:playlistId",
        element: (
          <AuthLayout authentication={true}>
          <PlaylistVideos />
        </AuthLayout>
        ),
      },
      {
        path: "/users/c/:username",
        element: (
          <AuthLayout authentication={true}>
          <Dashboard />
         </AuthLayout>
        ),
        children:[
          {
            index: true,
            element: (
              <AuthLayout authentication={true}>
              <DashboardVideos />
            </AuthLayout>
            ),
          },
          {
            path: "/users/c/:username/tweets",
            element: (
              <AuthLayout authentication={true}>
              <DashboardTweets />
            </AuthLayout>
            ),
          },
        ]
      },
      {
        path: "/chats/",
        element: (
          <AuthLayout authentication={true}>
          <ChatSidebar />
         </AuthLayout>
        ),
        children:[
          {
            index: true,
            element: (
              <AuthLayout authentication={true}>
              <EmptyChat />
            </AuthLayout>
            ),
          },
          {
            path: "/chats/message/:username",
            element: (
              <AuthLayout authentication={true}>
              <ChatWindow />
            </AuthLayout>
            ),
          },
        ]
      },
      
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

