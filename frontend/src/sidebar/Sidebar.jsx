import {
  Home,
  Heart,
  History,
  Video,
  Folder,
  User,
  MessageCircleIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gradient-to-b from-[#111827] via-[#1e1b4b] to-[#0f172a] text-white shadow-2xl backdrop-blur-xl border-r border-white/10 p-5 flex flex-col">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-center tracking-wide bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
        Streamify
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-2">
        {[
          { to: "/", icon: <Home />, label: "Home" },
          { to: "/videos/", icon: <Video />, label: "My Content" },
          { to: "/likes/videos", icon: <Heart />, label: "Liked Videos" },
          { to: "/users/history", icon: <History />, label: "History" },
          { to: "/playlist", icon: <Folder />, label: "Playlist" },
          { to: "/subscriptions/u/", icon: <User />, label: "Subscriptions" },
          { to: "/tweets/", icon: <User />, label: "Tweets" },
          { to: "/chats/", icon: <MessageCircleIcon />, label: "Chats" },
        ].map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-2xl font-medium text-gray-300 transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-white shadow-md scale-[1.02]"
                    : "hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <div className="flex-shrink-0">{icon}</div>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto text-center text-sm text-gray-500 border-t border-white/10 pt-4">
        © 2025 Streamify
      </div>
    </aside>
  );
};

export default Sidebar;
