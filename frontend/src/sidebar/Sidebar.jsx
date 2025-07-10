import { Home, Heart, History, Video, Folder, User, MessageCircleIcon} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  /*const navItems = [
    { icon: <Home />, label: 'Home' },
    { icon: <Heart />, label: 'Liked Videos' },
    { icon: <History />, label: 'History' },
    { icon: <Video />, label: 'My Content' },
    { icon: <Folder />, label: 'Collections' },
    { icon: <User />, label: 'Subscriptions' },
    { icon: <User />, label: 'Tweets' },
  ];*/

  return (
    <aside className="bg-black text-white w-60 min-h-screen p-4 space-y-2 pt-4">
      <div className="text-xl font-bold mt-4 flex items-center gap-2">
        
      </div>

       <div>
            <ul className='flex flex-col gap-1'>

              <li className='h-12 w-36 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-36 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'> <Home /> </div>
                    <div className='h-12 w-20 flex  items-center'><p className='text-xl'>Home</p></div>
                  </div>
                </NavLink>
              </li>

              <li className='h-12 w-36 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/videos/"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-52 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'><Video /> </div>
                    <div className='h-12 w-36 flex  items-center'><p className='text-xl'>My Content</p></div>
                  </div>
                </NavLink>
              </li>

              <li className='h-12 w-48 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/likes/videos"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-52 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'> <Heart/> </div>
                    <div className='h-12 w-36 flex  items-center'><p className='text-xl'>Liked Videos</p></div>
                  </div>
                </NavLink>
              </li>
              
              <li className='h-12 w-40 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/users/history"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-40 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'> <History /> </div>
                    <div className='h-12 w-24 flex  items-center'><p className='text-xl'>History</p></div>
                  </div>
                </NavLink>
              </li>

              <li className='h-12 w-32 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/grok"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-40 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'><Folder /> </div>
                    <div className='h-12 w-24 flex  items-center'><p className='text-xl'>Playlist</p></div>
                  </div>
                </NavLink>
              </li>

              <li className='h-12 w-48 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/subscriptions/u/"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-40 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'> <User /> </div>
                    <div className='h-12 w-24 flex  items-center'><p className='text-xl'>Subscriptions</p></div>
                  </div>
                </NavLink>
              </li>

              <li className='h-12 w-40 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/tweets/"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-40 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'> <User /> </div>
                    <div className='h-12 w-24 flex  items-center'><p className='text-xl'>Tweets</p></div>
                  </div>
                </NavLink>
              </li>

              <li className='h-12 w-48 rounded-3xl hover:bg-slate-800'>
                <NavLink 
                to="/chats/"
                className={({isActive}) =>
                    ` ${isActive ? "font-bold" : ""}`
                }>
                  <div className='h-12 w-48 flex justify-between'>
                    <div className='h-12 w-12 flex justify-center items-center'> <MessageCircleIcon  /> </div>
                    <div className='h-12 w-32 flex items-center'><p className='text-xl'>Chats</p></div>
                  </div>
                </NavLink>
              </li>


            </ul>
          </div>

      {/*navItems.map((item, index) => (
        <button key={index} className="w-full flex items-center gap-3 p-2 rounded hover:bg-purple-600">
          {item.icon}
          {item.label}
        </button>
      ))*/}
    </aside>
  );
};

export default Sidebar;
